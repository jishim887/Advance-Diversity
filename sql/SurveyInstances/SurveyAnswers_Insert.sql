USE [AdvDiversity]
GO
/****** Object:  StoredProcedure [dbo].[SurveyAnswers_Insert]    Script Date: 7/4/2022 1:13:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[SurveyAnswers_Insert]
			@batchAnswers dbo.SurveyAnswersTable READONLY
	-- =============================================
    -- Author: Ji Young Shim
    -- Create date: 6/02/2022
    -- Description: dbo.SurveyAnswers_Insert for dbo.SurveyAnswers
    -- MODIFIED BY: author
    -- MODIFIED DATE: M/DD/YEAR
    -- Code Reviewer:
    -- Note:
    -- =============================================

as

/* ----- TEST CODE -----

Declare @myAnswers dbo.SurveyAnswersTable

INSERT INTO @myAnswers
			(InstanceId, QuestionId, AnswerNumber)
	VALUES (67, 33, 0)

INSERT INTO @myAnswers
			(InstanceId, QuestionId, AnswerOptionId)
	VALUES (67, 34, 191)

INSERT INTO @myAnswers
			(InstanceId, QuestionId, Answer)
	VALUES (67, 35, 'SQL answer test')

EXECUTE dbo.SurveyAnswers_Insert
			@myAnswers

SELECT *
From dbo.SurveyAnswers

*/ ---- END TEST CODE ----

BEGIN
	INSERT INTO dbo.SurveyAnswers
				([InstanceId]
				,[QuestionId]
				,[AnswerOptionId]
				,[AnswerNumber]
				,[Answer]
				)
		SELECT InstanceId
				,QuestionId
				,AnswerOptionId
				,AnswerNumber
				,Answer
			FROM @batchAnswers

END