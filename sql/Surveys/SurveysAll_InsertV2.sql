USE [AdvDiversity]
GO
/****** Object:  StoredProcedure [dbo].[SurveyAll_InsertV2]    Script Date: 7/4/2022 1:12:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[SurveyAll_InsertV2]
		@Name nvarchar(100)
		,@Description nvarchar(2000)
		,@SurveyTypeId int
		,@StatusId int
		,@CreatedBy int
		,@BatchSections dbo.SurveySectionsTable2 READONLY
		,@BatchQuestions dbo.SurveyQuestionsTable READONLY
		,@BatchAnswerOptions dbo.SurveyAnswerOptionsTable2 READONLY
		,@Id int OUTPUT

  -- =============================================
    -- Author: Ji Young Shim
    -- Create date: 5/31/2022
    -- Description: SurveysAll_InsertV2 for dbo.Surveys, dbo.SurveySections, dbo.SurveyQuestions, dbo.SurveyQuestionAnswerOptions, dbo.SurveyInstances
    -- MODIFIED BY: author
    -- MODIFIED DATE: M/DD/YEAR
    -- Code Reviewer:
    -- Note:
    -- =============================================

as
/* ----- TEST CODE ------

DECLARE @Id int = 0
DECLARE @Name nvarchar(100) = 'survey test'
		,@Description nvarchar(2000) = 'test description'
		,@SurveyTypeId int = 1
		,@StatusId int = 1
		,@CreatedBy int = 1

DECLARE @MySections dbo.SurveySectionsTable2
INSERT INTO @MySections 
		(TempId, Title, Description, SortOrder)
	Values (777, 'section test', 'description test', 1)
			,(888, 'section test2', 'description test2', 2)

DECLARE @MyQuestions dbo.SurveyQuestionsTable
INSERT INTO @MyQuestions
		(TempId, UserId, Question, HelpText, isRequired, isMultipleAllowed, QuestionTypeId, TempSectionId, StatusId, SortOrder)
	VALUES (34, @CreatedBy, 'test1 question1', 'test1 help1', 1, 1, 8, 777, 1, 1)
			,(68, @CreatedBy, 'test1 question2', 'test1 help2', 1, 1, 1, 777, 1, 2)
			,(34, @CreatedBy, 'test2 question1', 'test2 help1', 1, 1, 8, 888, 1, 1)
			,(68, @CreatedBy, 'test2 question2', 'test2 help2', 1, 1, 1, 888, 1, 2)

DECLARE @MyOptions dbo.SurveyAnswerOptionsTable2
INSERT INTO @MyOptions
		(TempSectionId,TempQuestionId, Text, Value, AdditionalInfo, CreatedBy)
VALUES (777, 34, 'test1 text', '1', '', @CreatedBy)
		,(777, 34, 'test1 text2', '2', '', @CreatedBy)
		,(888, 34, 'test2 text1', '1', '', @CreatedBy)

EXECUTE dbo.SurveyAll_InsertV2
		@Name
		,@Description
		,@SurveyTypeId 
		,@StatusId
		,@CreatedBy
		,@MySections
		,@MyQuestions
		,@MyOptions
		,@Id OUTPUT

EXECUTE dbo.SurveyAll_SelectById
		@Id

*/ ---- END TEST CODE ----

BEGIN
SET XACT_ABORT ON
Declare @Tran nvarchar(50)  = '_uniquTxNameHere'

BEGIN TRY

BEGIN Transaction @Tran

	INSERT INTO dbo.Surveys
				([Name]
				,[Description]
				,[SurveyTypeId]
				,[StatusId]
				,[CreatedBy]
				)
		VALUES ( @Name
				,@Description
				,@SurveyTypeId
				,@StatusId
				,@CreatedBy
				)
		SET @Id = SCOPE_IDENTITY()

	DECLARE @mySectionIds Table(
			Id int NOT NULL
			,TempId int NOT NULL
			)
	INSERT INTO dbo.SurveySections
				([SurveyId]
				,[TempId]
				,[Title]
				,[Description]
				,[SortOrder]
				)
		OUTPUT INSERTED.Id, INSERTED.TempId
		INTO @mySectionIds
		SELECT 
				@Id
				,bs.[TempId]
				,bs.[Title]
				,bs.[Description]
				,bs.[SortOrder]
			FROM @batchSections AS bs

	DECLARE @myQuestionIds AS TABLE (
		Id int NOT NULL
		,TempId int NOT NULL
		,TempSectionId int NOT NULL
		)

	INSERT INTO dbo.SurveyQuestions
				([UserId]
				,[TempId]
				,[Question]
				,[HelpText]
				,[isRequired]
				,[isMultipleAllowed]
				,[QuestionTypeId]
				,[TempSectionId]
				,[SectionId]
				,[StatusId]
				,[SortOrder]
				)
		OUTPUT INSERTED.Id, INSERTED.TempId, INSERTED.TempSectionId
		INTO @myQuestionIds
		SELECT	@CreatedBy
				,bq.[TempId]
				,bq.[Question]
				,bq.[HelpText]
				,bq.[isRequired]
				,bq.[isMultipleAllowed]
				,bq.[QuestionTypeId]
				,bq.[TempSectionId]
				,ss.[Id]
				,bq.[StatusId]
				,bq.[SortOrder]
		FROM @batchQuestions AS bq 
		INNER JOIN @mySectionIds AS ss ON ss.TempId = bq.TempSectionId

	INSERT INTO dbo.SurveyQuestionAnswerOptions
				([QuestionId]
				,[Text]
				,[Value]
				,[AdditionalInfo]
				,[CreatedBy]		
				)
		SELECT q.[Id]
				,ba.[Text]
				,ba.[Value]
				,ba.[AdditionalInfo]
				,@CreatedBy
		FROM @BatchAnswerOptions AS ba INNER JOIN @myQuestionIds AS q
			ON ba.TempQuestionId = q.TempId AND ba.TempSectionId = q.TempSectionId

Commit Transaction @Tran

END TRY
BEGIN Catch



    IF (XACT_STATE()) = -1
    BEGIN
        PRINT 'The transaction is in an uncommittable state.' +
              ' Rolling back transaction.'
        ROLLBACK TRANSACTION @Tran;;
    END;

    -- Test whether the transaction is active and valid.
    IF (XACT_STATE()) = 1
    BEGIN
        PRINT 'The transaction is committable.' +
              ' Committing transaction.'
        COMMIT TRANSACTION @Tran;;
    END;

        -- If you want to see error info
       SELECT
        ERROR_NUMBER() AS ErrorNumber,
        --ERROR_SEVERITY() AS ErrorSeverity,
        --ERROR_STATE() AS ErrorState,
       -- ERROR_PROCEDURE() AS ErrorProcedure,
       ERROR_LINE() AS ErrorLine,
       ERROR_MESSAGE() AS ErrorMessage

-- to just get the error thrown and see the bad news as an exception
   -- THROW

End Catch




SET XACT_ABORT OFF
				
END