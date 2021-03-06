USE [AdvDiversity]
GO
/****** Object:  StoredProcedure [dbo].[MentorProfiles_Insert]    Script Date: 7/2/2022 10:20:53 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[MentorProfiles_Insert]
		@UserId int
		,@FirstName nvarchar(100)
		,@LastName nvarchar(100)
		,@ImageUrl nvarchar(4000)
		,@Description nvarchar(500)
		,@PhoneNumber nvarchar(10)
		,@SocialMediaLink nvarchar(4000)
		,@LocationTypeId int
		,@LineOne nvarchar(255)
		,@LineTwo nvarchar(255)
		,@City nvarchar(255)
		,@Zip  nvarchar(50)
		,@StateId int
		,@Latitude float
		,@Longitude float
		,@batchFocusAreas dbo.MentorProfileFocusAreasTable READONLY
		,@batchAges dbo.MentorProfileAgesTable READONLY
		,@batchGrades dbo.MentorProfileGradesTable READONLY
		,@batchMentoringTypes dbo.MentorProfileMentoringTypesTable READONLY
		,@batchGenderTypes dbo.MentorProfileGenderTypesTable READONLY
		,@batchSpecialties dbo.MentorProfileSpecialtiesTable READONLY
		,@Id int OUTPUT

-- =============================================
	-- Author: Ji Young Shim
	-- Create date: 6/18/2022
	-- Description: MentorProfiles_InsertV2 for dbo.MentorProfiles, dbo.MentorAges, dbo.MentorFocusAreas, dbo.MentorGrades, dbo.MentorMentoringTypes dbo.MentorGenderTypes, dbo.MentorSpecialties, dbo.Location
	-- Code Reviewer: Amy Xiong
	-- MODIFIED BY: 
	-- MODIFIED DATE:
	-- Code Reviewer: 
	-- Note:
-- =============================================

AS

/* ---- TEST CODE ----

DECLARE @Id int = 0
DECLARE @UserId int = 77
		,@FirstName nvarchar(100) = 'MentorFirst'
		,@LastName nvarchar(100) = 'MentorLast'
		,@ImageUrl nvarchar(4000) = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsm.askmen.com%2Ft%2Faskmen_in%2Farticle%2Ff%2Ffacebook-p%2Ffacebook-profile-picture-affects-chances-of-gettin_fr3n.1200.jpg&f=1&nofb=1'
		,@Description nvarchar(500) = 'I am a mentor looking forward to doing some amazing mentoring.'
		,@PhoneNumber nvarchar(10) = '1231231234'
		,@SocialMediaLink nvarchar(4000) = 'www.google.com'
		,@LocationTypeId int = 3
		,@LineOne nvarchar(255) = '123 Exp Ave'
		,@LineTwo nvarchar(255) = 'Apt 26'
		,@City nvarchar(255) = 'OtherTown'
		,@Zip nvarchar(50) = '45435'
		,@StateId int = 66
		,@Latitude float = 62.93873
		,@Longitude float = 72.76434

DECLARE @batchFocusAreas dbo.MentorProfileFocusAreasTable
INSERT INTO @batchFocusAreas
		(FocusAreaId)
	VALUES (1), (2)

DECLARE @batchAges dbo.MentorProfileAgesTable
INSERT INTO @batchAges
		(AgeId)
	VALUES (1), (2)

DECLARE @batchGrades dbo.MentorProfileGradesTable
INSERT INTO @batchGrades
		(GradeId)
	VALUES (1), (2)

DECLARE @batchMentoringTypes dbo.MentorProfileMentoringTypesTable
INSERT INTO @batchMentoringTypes
		(MentoringTypeId)
	VALUES (1), (2)

DECLARE @batchGenderTypes dbo.MentorProfileGenderTypesTable
INSERT INTO @batchGenderTypes
		(GenderTypeId)
	VALUES (1), (2)

DECLARE @batchSpecialties dbo.MentorProfileSpecialtiesTable
INSERT INTO @batchSpecialties
		(SpecialtyId)
	VALUES (1), (2)

EXECUTE dbo.MentorProfiles_Insert
		@UserId 
		,@FirstName
		,@LastName
		,@ImageUrl
		,@Description
		,@PhoneNumber
		,@SocialMediaLink
		,@LocationTypeId
		,@LineOne
		,@LineTwo
		,@City
		,@Zip
		,@StateId
		,@Latitude
		,@Longitude
		,@batchFocusAreas
		,@batchAges
		,@batchGrades
		,@batchMentoringTypes
		,@batchGenderTypes
		,@batchSpecialties
		,@Id OUTPUT

SELECT *
FROM dbo.MentorProfiles
WHERE Id = @Id

SELECT *
FROM dbo.Locations
WHERE CreatedBy = @UserId

SELECT *
FROM dbo.Users


*/--- END TEST CODE ---

BEGIN
	INSERT INTO dbo.MentorProfiles
			(UserId
			,FirstName
			,LastName
			,ImageUrl
			,Description
			,PhoneNumber
			,SocialMediaLink
			)
		VALUES (@UserId
				,@FirstName
				,@LastName
				,@ImageUrl
				,@Description
				,@PhoneNumber
				,@SocialMediaLink
				)
		SET @Id = SCOPE_IDENTITY()

	INSERT INTO dbo.MentorFocusAreas
			(MentorId
			,FocusAreaId
			)
		SELECT @Id
				,b.FocusAreaId				
		FROM @batchFocusAreas as b

	INSERT INTO dbo.MentorAges
			(MentorId
			,AgeId
			)
		SELECT @Id
				,b.AgeId				
		FROM @batchAges as b

	INSERT INTO dbo.MentorGrades
			(MentorId
			,GradeId
			)
		SELECT @Id
				,b.GradeId				
		FROM @batchGrades as b

	INSERT INTO dbo.MentorMentoringTypes
			(MentorId
			,MentoringTypeId
			)
		SELECT @Id
				,b.MentoringTypeId				
		FROM @batchMentoringTypes as b

	INSERT INTO dbo.MentorGenderTypes
			(MentorId
			,GenderTypeId
			)
		SELECT @Id
				,b.GenderTypeId				
		FROM @batchGenderTypes as b

	INSERT INTO dbo.MentorSpecialties
			(MentorId
			,SpecialtyId
			)
		SELECT @Id
				,b.SpecialtyId				
		FROM @batchSpecialties as b

	DECLARE @LocationId int = 0
	EXECUTE dbo.Locations_Insert
				@LocationTypeId
				,@LineOne
				,@LineTwo
				,@City
				,@Zip
				,@StateId
				,@Latitude
				,@Longitude
				,@UserId
				,@LocationId OUTPUT


END