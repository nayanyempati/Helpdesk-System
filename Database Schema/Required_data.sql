USE [helpdesk]
GO
SET IDENTITY_INSERT [dbo].[users] ON 
GO
INSERT [dbo].[users] ([id], [first_name], [last_name], [email], [password], [photo], [email_invitation_link], [password_reset_link], [role], [email_inivitation_expiry], [company_name], [token], [company_id], [created_on], [last_updated_on], [account_status]) VALUES (1, N'Nayan', N'Yempati', N'nayanyempati@gmail.com', N'd593c70aa15b74ef23229bbe594005317e4ac2e734dfe4520692f9e1a19e3685926278e7038196c90f66804828e7a1438c56c9b6b23a3b0a5aa5e70607cb2515', N'https://cdn-icons-png.flaticon.com/512/3899/3899618.png', N'lG_bahny_fgr', N'FaHTxcuDvYQI', N'admin', CAST(N'2022-12-13T00:33:45.653' AS DateTime), N'Helpdesk', N'JKRWmq_Ton', 1, CAST(N'2022-12-13T00:33:45.653' AS DateTime), CAST(N'2022-12-13T00:33:45.653' AS DateTime), N'Active')
GO
SET IDENTITY_INSERT [dbo].[users] OFF
GO
