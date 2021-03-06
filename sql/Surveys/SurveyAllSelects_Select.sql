USE [AdvDiversity]
GO
/****** Object:  StoredProcedure [dbo].[SurveyAllSelects_Select]    Script Date: 7/4/2022 1:13:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[SurveyAllSelects_Select]

  -- =============================================
    -- Author: Ji Young Shim
    -- Create date: 5/28/2022
    -- Description: SurveyAllSelects_Select for dbo.SurveyTypes, dbo.SurveyStatus, dbo.QuestionTypes
    -- MODIFIED BY: author
    -- MODIFIED DATE: M/DD/YEAR
    -- Code Reviewer:
    -- Note:
    -- =============================================

as

/*

EXECUTE dbo.SurveyAllSelects_Select

*/

BEGIN
	SELECT	SurveyTypes = (
							SELECT Id
									,Name
							FROM dbo.SurveyTypes
							FOR JSON AUTO
							)
			,
			SurveyStatus = (
							SELECT Id
									,Name
							FROM dbo.SurveyStatus
							FOR JSON AUTO
							)
			,
			QuestionTypes = (
							SELECT Id
									,Name
							FROM dbo.QuestionTypes
							FOR JSON AUTO
							)
			

END