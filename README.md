# AdvDivRepo-2022
This repo consists of my contribution to the project. The Institute to Advance Diversity. 

Front End - React.js
Back End - .NET (C#)
Database - MS SQL

Features I worked on:
1. Surveys ---------------------------
- Surveys page gives adminstrators the option to create a survey and generate one for users to fill out.
- The creation page is in the form of a Wizard, allowing admins to fill out the form in sequential order without the quantity of the contents being overwhelming.
- The title, description, sections and questions of the created surveys will be generated based on the configurations stored in the SQL database.
React libraries: Formik, Loki, Bootstrap, toastr

2. Mentor Public Page ---------------------------
- A public list of mentors that all website visitors can peruse to see which mentors they would like to pair up with.
- There exists an advanced filtering option to pull a list of mentors based on the mentoring types selected and attributed to each mentor
React libraries: Formik, react-select, Bootstrap, toastr

3. Mentor Profile Form ---------------------------
- New mentors will be prompted to fill out the profile form upon confirming their email. Mentors will be redirected to this page upon logging in until the form is submitted.
- The form is a Wizard, same foundation as the survey creation form.
React libraries: Formik, Loki, Bootstrap, toastr

4.  Donations ---------------------------
- responsible for giving all website visitors the opinion to donate to the organization through a responsive form. Payment is processed using PayPal API and email confirmation is sent vai Sendgrid API
React libraries: Paypal, Sendgrid, Bootstrap, toastr
