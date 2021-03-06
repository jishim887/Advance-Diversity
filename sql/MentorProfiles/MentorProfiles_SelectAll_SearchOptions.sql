USE [AdvDiversity]
GO
/****** Object:  StoredProcedure [dbo].[MentorProfiles_SelectAll_SearchOptions]    Script Date: 7/4/2022 1:18:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[MentorProfiles_SelectAll_SearchOptions]
		@PageIndex int
		,@PageSize int
		,@BatchFocusAreas dbo.FocusAreasTable READONLY
		,@BatchAges dbo.AgesTable READONLY
		,@BatchGrades dbo.GradesTable READONLY
		,@BatchMentoringTypes dbo.MentoringTypesTable READONLY
		,@BatchGenderTypes dbo.GenderTypesTable READONLY
		,@BatchSpecialties dbo.SpecialtiesTable READONLY

-- =============================================
	-- Author: Ji Young Shim
	-- Create date: 6/28/2022
	-- Description: MentorProfile_SelectAll_SearchOptions for dbo.MentorProfiles, dbo.FocusAreas, dbo.Ages, dbo.Grades, dbo.MentoringTypes dbo.GenderTypes, dbo.Specialties, dbo.Location, dbo.LocationTypeId, dbo.StateId
	-- Code Reviewer: Amy Xiong
	-- MODIFIED BY: 
	-- MODIFIED DATE:
	-- Code Reviewer: 
	-- Note:
-- =============================================

AS

/* ---- TEST CODE ----

DECLARE @Index int = 0
		,@Size int = 10
		,@batchFocusAreas dbo.FocusAreasTable 
		,@batchAges dbo.AgesTable 
		,@batchGrades dbo.GradesTable 
		,@batchMentoringTypes dbo.MentoringTypesTable 
		,@batchGenderTypes dbo.GenderTypesTable 
		,@batchSpecialties dbo.SpecialtiesTable
INSERT INTO @batchFocusAreas (Id)
		VALUES (1),(2)
INSERT INTO @batchAges (Id)
		VALUES (1),(2)
INSERT INTO @batchGrades (Id)
		VALUES (1),(2)
INSERT INTO @batchMentoringTypes (Id)
		VALUES (1),(2)
INSERT INTO @batchGenderTypes (Id)
		VALUES (1),(2)
INSERT INTO @batchSpecialties (Id)
		VALUES (1),(2)

EXECUTE dbo.MentorProfiles_SelectAll_SearchOptions
		@Index
		,@Size
		,@batchFocusAreas
		,@batchAges
		,@batchGrades
		,@batchMentoringTypes
		,@batchGenderTypes
		,@batchSpecialties

*/ --- END TEST CODE ---

BEGIN

	DECLARE @TempMentors AS TABLE (Id int)

	INSERT INTO @TempMentors 
	EXECUTE dbo.MentorProfiles_SelectMentorByOption
			@BatchFocusAreas
			,@BatchAges
			,@BatchGrades
			,@BatchMentoringTypes
			,@BatchGenderTypes
			,@BatchSpecialties

	DECLARE @offset int = @PageIndex * @PageSize
	SELECT  p.Id
			,p.UserId
			,p.FirstName
			,p.LastName
			,p.ImageUrl
			,p.Description
			,p.PhoneNumber
			,p.SocialMediaLink
			,FocusAreas = (SELECT f.Id
								,f.Name
							FROM dbo.FocusAreas as f INNER JOIN dbo.MentorFocusAreas as mf
								ON f.Id = mf.FocusAreaId
							WHERE mf.MentorId = p.Id
							FOR JSON AUTO)

			,Ages = (SELECT a.Id
							,a.Name
							FROM dbo.Ages as a INNER JOIN dbo.MentorAges as ma
								ON a.Id = ma.AgeId
								WHERE ma.MentorId = p.Id
							FOR JSON AUTO)

			,Grades = (SELECT gr.Id
							,gr.Name
							FROM dbo.Grades as gr INNER JOIN dbo.MentorGrades as mgr
								ON gr.Id = mgr.GradeId
								WHERE mgr.MentorId = p.Id
							FOR JSON AUTO)

			,MentoringTypes = (SELECT m.Id
									,m.Name
							FROM dbo.MentoringTypes as m INNER JOIN dbo.MentorMentoringTypes as mm
								ON m.Id = mm.MentoringTypeId
								WHERE mm.MentorId = p.Id
							FOR JSON AUTO)

			,GenderTypes = (SELECT ge.Id
									,ge.Name
							FROM dbo.GenderTypes as ge INNER JOIN dbo.MentorGenderTypes as mge
								ON ge.Id = mge.GenderTypeId
								WHERE mge.MentorId = p.Id
							FOR JSON AUTO)

			,Specialties = (SELECT s.Id
								,s.Name
							FROM dbo.Specialties as s INNER JOIN dbo.MentorSpecialties as ms
								ON s.Id = ms.SpecialtyId
								WHERE ms.MentorId = p.Id
							FOR JSON AUTO)
			,l.Id
			,lt.Id AS LocationTypeId
			,lt.Name AS LocationType
			,l.LineOne
			,l.LineTwo
			,l.City
			,l.Zip
			,s.Id AS StateId
			,s.Name AS State
			,l.Latitude
			,l.Longitude
			,TotalCount = COUNT(1) OVER()
	FROM dbo.MentorProfiles as p INNER JOIN dbo.Locations as l
			ON p.UserId = l.CreatedBy
		INNER JOIN dbo.LocationTypes as lt
			ON l.LocationTypeId = lt.Id
		INNER JOIN dbo.States as s
			ON l.StateId = s.Id
	WHERE (l.LocationTypeId = 1 OR l.LocationTypeId = 3) 
			AND EXISTS (SELECT 1
						FROM @TempMentors
						WHERE p.Id = Id)
	ORDER BY p.Id DESC
	OFFSET @offSet Rows
	Fetch Next @PageSize Rows ONLY

END