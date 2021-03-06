USE [AdvDiversity]
GO
/****** Object:  StoredProcedure [dbo].[SurveyAll_SelectById]    Script Date: 7/4/2022 1:13:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[SurveyAll_SelectById]
			@Id int
		
	-- =============================================
    -- Author: Ji Young Shim
    -- Create date: 6/01/2022
    -- Description: SurveysAll_SelectById for dbo.Surveys, dbo.SurveySections, dbo.SurveyQuestions, dbo.SurveyQuestionAnswerOptions
    -- MODIFIED BY: author
    -- MODIFIED DATE: M/DD/YEAR
    -- Code Reviewer:
    -- Note:
    -- =============================================
as

/* ------ TEST CODE ------

DECLARE @Id int = 109

EXECUTE dbo.SurveyAll_SelectById
		@Id

SELECT *
FROM dbo.Surveys

*/ ---- END TEST CODE ----

BEGIN
	
	SELECT s.Id
			,s.Name
			,s.Description
			,t.Name as SurveyType
			,st.Name as Status
			,s.CreatedBy
			,s.DateCreated
			,s.DateModified
			,Sections = (SELECT ss.Id
							,ss.SurveyId
								,ss.Title
								,ss.Description
								,ss.SortOrder
							FROM dbo.SurveySections as ss
							WHERE @Id = ss.SurveyId
							ORDER BY ss.SortOrder
							FOR JSON AUTO
							)
			,Questions = (SELECT q.Id
								,q.UserId
								,q.Question
								,q.HelpText
								,q.isRequired
			  					,q.isMultipleAllowed
								,q.QuestionTypeId
								,q.SectionId
								,q.StatusId
								,q.SortOrder
							FROM dbo.SurveyQuestions as q INNER JOIN dbo.SurveySections as ss
								ON q.SectionId = ss.Id
							WHERE ss.SurveyId = s.Id
							ORDER BY q.SectionId, q.SortOrder
							FOR JSON AUTO
						)
			,AnswerOptions = (SELECT a.Id
									,a.QuestionId
									,a.Text
									,a.Value
									,a.AdditionalInfo
									,a.CreatedBy
							FROM dbo.SurveyQuestionAnswerOptions as a INNER JOIN dbo.SurveyQuestions as q
								ON a.QuestionId = q.Id
							INNER JOIN dbo.SurveySections as ss
								ON q.SectionId = ss.Id
							WHERE ss.SurveyId = s.Id
							ORDER BY a.QuestionId
							FOR JSON AUTO
							)
	FROM dbo.Surveys as s INNER JOIN dbo.Users as u
		ON s.CreatedBy = u.Id
	INNER JOIN dbo.SurveyStatus as st
		ON s.StatusId = st.Id
	INNER JOIN dbo.SurveyTypes as t
		ON s.SurveyTypeId = t.Id
	WHERE s.Id = @Id

END