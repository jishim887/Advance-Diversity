USE [AdvDiversity]
GO
/****** Object:  StoredProcedure [dbo].[SurveyInstances_Insert]    Script Date: 7/4/2022 1:13:20 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[SurveyInstances_Insert]
		@SurveyId int
		,@UserId int
		,@Id int OUTPUT

	-- =============================================
    -- Author: Ji Young Shim
    -- Create date: 6/02/2022
    -- Description: dbo.SurveyInstances_Insert for dbo.SurveyInstances
    -- MODIFIED BY: author
    -- MODIFIED DATE: M/DD/YEAR
    -- Code Reviewer:
    -- Note:
    -- =============================================

as

/* ---- TEST CODE ----

DECLARE @Id int = 0
DECLARE @SurveyId int = 12
		,@UserId int = 1

EXECUTE dbo.SurveyInstances_Insert
		@SurveyId
		,@UserId
		,@Id OUTPUT

SELECT *
FROM dbo.SurveyInstances
WHERE Id = @Id

*/--- END TEST CODE ---

BEGIN
	INSERT INTO dbo.SurveyInstances
			([SurveyId]
			,[UserId]
			)
	VALUES (@SurveyId
			,@UserId
			)
	SET @Id = SCOPE_IDENTITY()

END