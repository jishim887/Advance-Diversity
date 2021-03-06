USE [AdvDiversity]
GO
/****** Object:  StoredProcedure [dbo].[MentorProfiles_Update]    Script Date: 7/2/2022 10:21:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[MentorProfiles_Update]
		@Id int
		,@UserId int
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

-- =============================================
	-- Author: Ji Young Shim
	-- Create date: 6/18/2022
	-- Description: MentorProfiles_Update for dbo.MentorProfiles, dbo.MentorAges, dbo.MentorFocusAreas, dbo.MentorGrades, dbo.MentorMentoringTypes dbo.MentorGenderTypes, dbo.MentorSpecialties, dbo.Location
	-- Code Reviewer: Amy Xiong
	-- MODIFIED BY: 
	-- MODIFIED DATE:
	-- Code Reviewer: 
	-- Note:
-- =============================================

AS

/* ---- TEST CODE ----

DECLARE @Id int = 17
DECLARE @UserId int = 77
		,@FirstName nvarchar(100) = 'MentorFirstUpdated'
		,@LastName nvarchar(100) = 'MentorLastUpdated'
		,@ImageUrl nvarchar(4000) = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsm.askmen.com%2Ft%2Faskmen_in%2Farticle%2Ff%2Ffacebook-p%2Ffacebook-profile-picture-affects-chances-of-gettin_fr3n.1200.jpg&f=1&nofb=1'
		,@Description nvarchar(500) = 'I am an updated mentor looking forward to doing some amazing mentoring.'
		,@PhoneNumber nvarchar(10) = '1231231234'
		,@SocialMediaLink nvarchar(4000) = 'www.twitter.com'
		,@LocationTypeId int = 3
		,@LineOne nvarchar(255) = '2800 East Observatory Road'
		,@LineTwo nvarchar(255) = 'Apt 26'
		,@City nvarchar(255) = 'Los Angeles'
		,@Zip nvarchar(50) = '90027'
		,@StateId int = 8
		,@Latitude float = 34.1184341
		,@Longitude float = -118.3003935
DECLARE @batchFocusAreas dbo.MentorProfileFocusAreasTable
INSERT INTO @batchFocusAreas
		(FocusAreaId)
	VALUES (3), (4)

DECLARE @batchAges dbo.MentorProfileAgesTable
INSERT INTO @batchAges
		(AgeId)
	VALUES (3), (4)

DECLARE @batchGrades dbo.MentorProfileGradesTable
INSERT INTO @batchGrades
		(GradeId)
	VALUES (3), (4)

DECLARE @batchMentoringTypes dbo.MentorProfileMentoringTypesTable
INSERT INTO @batchMentoringTypes
		(MentoringTypeId)
	VALUES (3), (4)

DECLARE @batchGenderTypes dbo.MentorProfileGenderTypesTable
INSERT INTO @batchGenderTypes
		(GenderTypeId)
	VALUES (3), (4)

DECLARE @batchSpecialties dbo.MentorProfileSpecialtiesTable
INSERT INTO @batchSpecialties
		(SpecialtyId)
	VALUES (3), (4)

EXECUTE dbo.MentorProfiles_Update
		@Id
		,@UserId 
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
	DECLARE @dateModified datetime2(7) = GETUTCDATE()
	UPDATE dbo.MentorProfiles
		SET UserId = @UserId
			,FirstName = @FirstName
			,LastName = @LastName
			,ImageUrl = @ImageUrl
			,Description = @Description
			,PhoneNumber = @PhoneNumber
			,SocialMediaLink = @SocialMediaLink
			,DateModified = @dateModified
		WHERE Id = @Id


	DELETE FROM dbo.MentorFocusAreas
		WHERE MentorId = @Id
	INSERT INTO dbo.MentorFocusAreas
			(MentorId
			,FocusAreaId
			)
		SELECT @Id
				,b.FocusAreaId				
		FROM @batchFocusAreas as b


	DELETE FROM dbo.MentorAges
		WHERE MentorId = @Id
	INSERT INTO dbo.MentorAges
			(MentorId
			,AgeId
			)
		SELECT @Id
				,b.AgeId				
		FROM @batchAges as b


	DELETE FROM dbo.MentorGrades
		WHERE MentorId = @Id
	INSERT INTO dbo.MentorGrades
			(MentorId
			,GradeId
			)
		SELECT @Id
				,b.GradeId				
		FROM @batchGrades as b


	DELETE FROM dbo.MentorMentoringTypes
		WHERE MentorId = @Id
	INSERT INTO dbo.MentorMentoringTypes
			(MentorId
			,MentoringTypeId
			)
		SELECT @Id
				,b.MentoringTypeId				
		FROM @batchMentoringTypes as b


	DELETE FROM dbo.MentorGenderTypes
		WHERE MentorId = @Id
	INSERT INTO dbo.MentorGenderTypes
			(MentorId
			,GenderTypeId
			)
		SELECT @Id
				,b.GenderTypeId				
		FROM @batchGenderTypes as b


	DELETE FROM dbo.MentorSpecialties
		WHERE MentorId = @Id
	INSERT INTO dbo.MentorSpecialties
			(MentorId
			,SpecialtyId
			)
		SELECT @Id
				,b.SpecialtyId				
		FROM @batchSpecialties as b

	DELETE FROM dbo.Locations
		WHERE CreatedBy = @UserId AND (LocationTypeId = 1 OR LocationTypeId = 3)

	INSERT INTO dbo.Locations
			([LocationTypeId]
			   ,[LineOne]
			   ,[LineTwo]
			   ,[City]
			   ,[Zip]
			   ,[StateId]
			   ,[Latitude]
			   ,[Longitude]
			   ,[CreatedBy]
			   ,[ModifiedBy]
			   )
		VALUES (@LocationTypeId
				,@LineOne
				,@LineTwo
				,@City
				,@Zip
				,@StateId
				,@Latitude
				,@Longitude
				,@UserId
				,@UserId
				)


END