USE [AdvDiversity]
GO
/****** Object:  StoredProcedure [dbo].[MentorProfiles_SelectAll_Search]    Script Date: 7/4/2022 1:18:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[MentorProfiles_SelectAll_Search]
		@PageIndex int
		,@PageSize int
		,@Query nvarchar(100)

-- =============================================
	-- Author: Ji Young Shim
	-- Create date: 6/28/2022
	-- Description: MentorProfile_SelectAll_Search for dbo.MentorProfiles, dbo.FocusAreas, dbo.Ages, dbo.Grades, dbo.MentoringTypes dbo.GenderTypes, dbo.Specialties, dbo.Location, dbo.LocationTypeId, dbo.StateId
	-- Code Reviewer: Amy Xiong
	-- MODIFIED BY: 
	-- MODIFIED DATE:
	-- Code Reviewer: 
	-- Note:
-- =============================================

AS

/* ---- TEST CODE ----

DECLARE @Index int = 0
		,@Size int = 2
		,@Query nvarchar(100) = 'lauren'
EXECUTE dbo.MentorProfiles_SelectAll_Search
		@Index
		,@Size
		,@Query

*/ --- END TEST CODE ---

BEGIN 
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
			AND ((p.FirstName LIKE '%' + @Query + '%') 
				OR (p.LastName LIKE '%' + @Query + '%')
				OR (p.Description LIKE '%' + @Query + '%')
				)
	ORDER BY p.Id DESC
	OFFSET @offSet Rows
	Fetch Next @PageSize Rows ONLY

END