USE [AdvDiversity]
GO
/****** Object:  StoredProcedure [dbo].[MentorProfiles_SelectMentorByOption]    Script Date: 7/4/2022 1:18:39 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[MentorProfiles_SelectMentorByOption]
	@BatchFocusAreas dbo.FocusAreasTable READONLY
	,@BatchAges dbo.AgesTable READONLY
	,@BatchGrades dbo.GradesTable READONLY
	,@BatchMentoringTypes dbo.MentoringTypesTable READONLY
	,@BatchGenderTypes dbo.GenderTypesTable READONLY
	,@BatchSpecialties dbo.SpecialtiesTable READONLY

-- =============================================
	-- Author: Ji Young Shim
	-- Create date: 6/28/2022
	-- Description: [MentorProfiles_SelectMentorByOption] for dbo.FocusAreasTable, dbo.AgesTable, dbo.GradesTable, dbo.MentoringTypesTable, dbo.GenderTypesTable dbo.SpecialtiesTable
	-- Code Reviewer: Amy Xiong
	-- MODIFIED BY: 
	-- MODIFIED DATE:
	-- Code Reviewer: 
	-- Note:
-- =============================================

AS

/*---- TEST CODE ----

DECLARE @batchFocusAreas dbo.FocusAreasTable 
		,@batchAges dbo.AgesTable 
		,@batchGrades dbo.GradesTable 
		,@batchMentoringTypes dbo.MentoringTypesTable 
		,@batchGenderTypes dbo.GenderTypesTable 
		,@batchSpecialties dbo.SpecialtiesTable
INSERT INTO @batchFocusAreas (Id)
		VALUES (1)
--INSERT INTO @batchAges (Id)
--		VALUES (1),(2)
--INSERT INTO @batchGrades (Id)
--		VALUES (1),(2)
INSERT INTO @batchMentoringTypes (Id)
		VALUES (1)
--INSERT INTO @batchGenderTypes (Id)
--		VALUES (1),(2)
--INSERT INTO @batchSpecialties (Id)
--		VALUES (1),(2)

EXECUTE dbo.MentorProfiles_SelectMentorByOption
			@batchFocusAreas
			,@batchAges
			,@batchGrades
			,@batchMentoringTypes
			,@batchGenderTypes
			,@batchSpecialties

*/--- END TEST CODE ---

BEGIN
	DECLARE @TempMentors AS TABLE (Id int)
	DECLARE @Counter int = 0
	
	IF ((	SELECT TOP 1 Id
			From @BatchFocusAreas
		) IS NOT NULL)
	BEGIN
		 INSERT INTO @TempMentors (Id)
			SELECT m.MentorId
			FROM dbo.MentorFocusAreas as m INNER JOIN @BatchFocusAreas as b
				ON m.FocusAreaId = b.Id
			GROUP BY m.MentorId
			HAVING COUNT(MentorId) = (SELECT COUNT (Id) AS IdNum
								FROM @BatchFocusAreas) 	

		SET @Counter = @Counter + 1
	END

	IF ((	SELECT TOP 1 Id
			FROM @BatchAges
		) IS NOT NULL)
	BEGIN
		 INSERT INTO @TempMentors (Id)
			SELECT m.MentorId
			FROM dbo.MentorAges as m INNER JOIN @BatchAges as b
				ON m.AgeId = b.Id
			GROUP BY m.MentorId
			HAVING COUNT(MentorId) = (SELECT COUNT (Id) AS IdNum
								FROM @BatchAges) 	
		SET @Counter = @Counter + 1
	END

	IF ((	SELECT TOP 1 Id
			FROM @batchGrades
		) IS NOT NULL)
	BEGIN
		 INSERT INTO @TempMentors (Id)
			SELECT m.MentorId
			FROM dbo.MentorGrades as m INNER JOIN @BatchGrades as b
				ON m.GradeId = b.Id
			GROUP BY m.MentorId
			HAVING COUNT(MentorId) = (SELECT COUNT (Id) AS IdNum
								FROM @BatchGrades) 	
		SET @Counter = @Counter + 1
	END

	IF ((	SELECT TOP 1 Id
			FROM @BatchMentoringTypes
		) IS NOT NULL)
	BEGIN
		 INSERT INTO @TempMentors (Id)
			SELECT m.MentorId
			FROM dbo.MentorMentoringTypes as m INNER JOIN @BatchMentoringTypes as b
				ON m.MentoringTypeId = b.Id
			GROUP BY m.MentorId
			HAVING COUNT(MentorId) = (SELECT COUNT (Id) AS IdNum
								FROM @BatchMentoringTypes) 
		SET @Counter = @Counter + 1
	END

	IF ((	SELECT TOP 1 Id
			FROM @BatchGenderTypes
		) IS NOT NULL)
	BEGIN
		 INSERT INTO @TempMentors (Id)
			SELECT m.MentorId
			FROM dbo.MentorGenderTypes as m INNER JOIN @BatchGenderTypes as b
				ON m.GenderTypeId = b.Id
			GROUP BY m.MentorId
			HAVING COUNT(MentorId) = (SELECT COUNT (Id) AS IdNum
								FROM @BatchGenderTypes) 
		SET @Counter = @Counter + 1
	END

	IF ((	SELECT TOP 1 Id
			FROM @BatchSpecialties
		) IS NOT NULL)
	BEGIN
		 INSERT INTO @TempMentors (Id)
			SELECT m.MentorId
			FROM dbo.MentorSpecialties as m INNER JOIN @BatchSpecialties as b
				ON m.SpecialtyId = b.Id
			GROUP BY m.MentorId
			HAVING COUNT(MentorId) = (SELECT COUNT (Id) AS IdNum
								FROM @BatchSpecialties)
		SET @Counter = @Counter + 1
	END

	PRINT(@Counter)

	-- Retrieves AND number of mentors. If you want to retrieve OR number of mentors instead, use SELECT DISTINCT or COUNT(Id) >= 1
	SELECT Id
	FROM @TempMentors
	GROUP BY Id
	HAVING COUNT(Id) = @Counter

END