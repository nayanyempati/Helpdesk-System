USE [master]
GO
/****** Object:  Database [helpdesk]    Script Date: 16-12-2022 1.07.04 AM ******/
CREATE DATABASE [helpdesk]
GO
ALTER DATABASE [helpdesk] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [helpdesk].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [helpdesk] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [helpdesk] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [helpdesk] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [helpdesk] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [helpdesk] SET ARITHABORT OFF 
GO
ALTER DATABASE [helpdesk] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [helpdesk] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [helpdesk] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [helpdesk] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [helpdesk] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [helpdesk] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [helpdesk] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [helpdesk] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [helpdesk] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [helpdesk] SET  DISABLE_BROKER 
GO
ALTER DATABASE [helpdesk] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [helpdesk] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [helpdesk] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [helpdesk] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [helpdesk] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [helpdesk] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [helpdesk] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [helpdesk] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [helpdesk] SET  MULTI_USER 
GO
ALTER DATABASE [helpdesk] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [helpdesk] SET DB_CHAINING OFF 
GO
ALTER DATABASE [helpdesk] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [helpdesk] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [helpdesk] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [helpdesk] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [helpdesk] SET QUERY_STORE = OFF
GO
USE [helpdesk]
GO
/****** Object:  Table [dbo].[attachments]    Script Date: 16-12-2022 1.07.04 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[attachments](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[link] [varchar](500) NULL,
	[ticket_token] [varchar](50) NULL,
	[created_by] [int] NULL,
	[token] [varchar](50) NULL,
	[created_on] [datetime] NULL,
 CONSTRAINT [PK_attachments] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[comments]    Script Date: 16-12-2022 1.07.04 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[comments](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ticket_id] [int] NOT NULL,
	[description] [varchar](max) NOT NULL,
	[attachment_link] [varchar](500) NULL,
	[created_by] [int] NOT NULL,
	[created_on] [datetime] NOT NULL,
	[token] [varchar](50) NOT NULL,
	[ticket_token] [varchar](50) NULL,
	[Created_by_fullname] [varchar](50) NULL,
 CONSTRAINT [PK_comments] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[companies]    Script Date: 16-12-2022 1.07.04 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[companies](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[company_name] [varchar](100) NOT NULL,
	[token] [varchar](50) NOT NULL,
	[created_on] [datetime] NOT NULL,
	[created_by] [int] NOT NULL,
	[logo] [varchar](500) NULL,
 CONSTRAINT [PK_companies] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[departments]    Script Date: 16-12-2022 1.07.04 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[departments](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[department] [varchar](150) NOT NULL,
	[description] [varchar](500) NOT NULL,
	[created_on] [datetime] NOT NULL,
	[created_by] [int] NOT NULL,
	[token] [varchar](50) NOT NULL,
 CONSTRAINT [PK_departments] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tickets]    Script Date: 16-12-2022 1.07.04 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tickets](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[title] [varchar](max) NOT NULL,
	[description] [varchar](max) NOT NULL,
	[priority] [varchar](50) NOT NULL,
	[keywords] [varchar](max) NULL,
	[token] [varchar](50) NOT NULL,
	[created_by] [int] NOT NULL,
	[created_by_full_name] [varchar](150) NOT NULL,
	[created_on] [datetime] NOT NULL,
	[department] [varchar](50) NOT NULL,
	[assigned_to] [int] NULL,
	[assigned_to_full_name] [varchar](150) NULL,
	[assigned_on] [datetime] NULL,
	[status] [varchar](50) NULL,
 CONSTRAINT [PK_tickets] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[users]    Script Date: 16-12-2022 1.07.04 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[first_name] [varchar](50) NOT NULL,
	[last_name] [varchar](50) NOT NULL,
	[email] [varchar](50) NOT NULL,
	[password] [varchar](max) NOT NULL,
	[photo] [varchar](max) NOT NULL,
	[email_invitation_link] [varchar](500) NULL,
	[password_reset_link] [varchar](500) NULL,
	[role] [varchar](50) NOT NULL,
	[email_inivitation_expiry] [datetime] NULL,
	[company_name] [varchar](100) NULL,
	[token] [varchar](50) NOT NULL,
	[company_id] [int] NULL,
	[created_on] [datetime] NOT NULL,
	[last_updated_on] [datetime] NOT NULL,
	[account_status] [varchar](50) NOT NULL,
 CONSTRAINT [PK_users] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
USE [master]
GO
ALTER DATABASE [helpdesk] SET  READ_WRITE 
GO
