USE [AdvDiversity]
GO
/****** Object:  StoredProcedure [dbo].[MentorProfiles_Delete]    Script Date: 7/4/2022 1:18:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[MentorProfiles_Delete]
			@Id int

-- =============================================
	-- Author: Ji Young Shim
	-- Create date: 6/18/2022
	-- Description: MentorProfiles_Delete for dbo.MentorProfiles, dbo.MentorAges, dbo.MentorFocusAreas, dbo.MentorGrades, dbo.MentorMentoringTypes dbo.MentorGenderTypes, dbo.MentorSpecialties
	-- Code Reviewer: Amy Xiong
	-- MODIFIED BY: 
	-- MODIFIED DATE:
	-- Code Reviewer: 
	-- Note:
-- =============================================

AS

/* ---- TEST CODE ----

DECLARE @Id int = 11

EXECUTE dbo.MentorProfiles_Delete
		@Id


*/--- END TEST CODE ---
BEGIN

	DELETE FROM dbo.MentorFocusAreas
			WHERE MentorId = @Id
	DELETE FROM dbo.MentorAges
			WHERE MentorId = @Id
	DELETE FROM dbo.MentorGrades
			WHERE MentorId = @Id
	DELETE FROM dbo.MentorMentoringTypes
			WHERE MentorId = @Id
	DELETE FROM dbo.MentorGenderTypes
			WHERE MentorId = @Id
	DELETE FROM dbo.MentorSpecialties
			WHERE MentorId = @Id

	DELETE FROM dbo.MentorProfiles
			WHERE Id = @Id



END