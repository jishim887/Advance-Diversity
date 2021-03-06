USE [AdvDiversity]
GO
/****** Object:  StoredProcedure [dbo].[Donations_Insert]    Script Date: 7/2/2022 10:08:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[Donations_Insert]
		@UserId int
		,@Email nvarchar(100)
		,@FirstName nvarchar(100)
		,@LastName nvarchar(100)
		,@CompanyName nvarchar(100)
		,@IsAnonymous bit
		,@Amount float
		,@Currency nvarchar(50)
		,@City nvarchar(50)
		,@State nvarchar(50)
		,@Country nvarchar(50)
		,@PayerId nvarchar(128)
		,@PaymentId nvarchar(128)
		,@PaymentToken nvarchar(128)
		,@ReturnUrl nvarchar(4000)
		,@Id int OUTPUT

AS

/* ---- TEST CODE ----

DECLARE @Id int = 0
DECLARE @UserId int = 2
		,@Email nvarchar(100) = 'test@email.com'
		,@FirstName nvarchar(100) = 'John'
		,@LastName nvarchar(100) = 'Doe'
		,@CompanyName nvarchar(100) = ''
		,@IsAnonymous bit = 0
		,@Amount float = 5
		,@Currency nvarchar(50) = 'USD'
		,@City nvarchar(50) = 'Los Angeles'
		,@State nvarchar(50) = 'CA'
		,@Country nvarchar(50) = 'US'
		,@PayerId nvarchar(128) = 'KKWLER4MDZ66U'
		,@PaymentId nvarchar(128) = 'PAYID-MKUP35Q3D05483148186042D'
		,@PaymentToken nvarchar(128) = 'EC-3DJ23095U26596339'
		,@ReturnUrl nvarchar(4000) = 'https://www.paypal.com/checkoutnow/error?paymentId=PAYID-MKUP35Q3D05483148186042D&token=EC-3DJ23095U26596'

EXECUTE dbo.Donations_Insert
		@UserId
		,@Email
		,@FirstName
		,@LastName
		,@CompanyName
		,@IsAnonymous 
		,@Amount 
		,@Currency
		,@City 
		,@State
		,@Country
		,@PayerId
		,@PaymentId
		,@PaymentToken
		,@ReturnUrl
		,@Id OUTPUT

SELECT *
FROM dbo.Donations
Where Id = @Id

*/--- END TEST CODE ---

BEGIN

	INSERT INTO dbo.Donations
				(UserId
				,Email
				,FirstName
				,LastName
				,CompanyName
				,IsAnonymous
				,Amount
				,Currency
				,City
				,State
				,Country
				,PayerId
				,PaymentId
				,PaymentToken
				,ReturnUrl
				)
		VALUES (@UserId
				,@Email
				,@FirstName
				,@LastName
				,@CompanyName
				,@IsAnonymous
				,@Amount
				,@Currency
				,@City
				,@State
				,@Country
				,@PayerId
				,@PaymentId
				,@PaymentToken
				,@ReturnUrl
				)
		SET @Id = SCOPE_IDENTITY()

END