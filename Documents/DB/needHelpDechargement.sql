--
-- Ce fichier de commandes recharge une base de données qui a été déchargée avec "dbunload".
--
-- (Version:  12.0.1.3152)
--


-- Database file: E:\Users\Maxime\Documents\GitHub\Projet-d-Integration\backend\needHelp.db
-- Database CHAR collation: 1252LATIN1, NCHAR collation: UCA
-- Connection Character Set: windows-1252
--
-- CREATE DATABASE command: CREATE DATABASE 'E:\\Users\\Maxime\\Documents\\GitHub\\Projet-d-Integration\\backend\\needHelp.db' LOG ON 'E:\\Users\\Maxime\\Documents\\GitHub\\Projet-d-Integration\\backend\\needHelp.log' CASE RESPECT ACCENT IGNORE PAGE SIZE 4096 COLLATION '1252LATIN1' NCHAR COLLATION 'UCA' BLANK PADDING OFF JCONNECT ON CHECKSUM ON
--


SET OPTION date_order          = 'YMD'
go

SET OPTION PUBLIC.preserve_source_format = 'OFF'
go

SET TEMPORARY OPTION tsql_outer_joins = 'ON'
go

SET TEMPORARY OPTION st_geometry_describe_type = 'binary'
go

SET TEMPORARY OPTION st_geometry_on_invalid = 'Ignore'
go

SET OPTION PUBLIC.reserved_keywords = ''
go


-------------------------------------------------
--   Create dbspaces
-------------------------------------------------


-------------------------------------------------
--   Create login policies
-------------------------------------------------


-------------------------------------------------
--   Create users
-------------------------------------------------

GRANT CONNECT,DBA,RESOURCE TO "DBA" IDENTIFIED BY sql
go

GRANT CONNECT,DBA,GROUP,RESOURCE TO "dbo"
go


-------------------------------------------------
--   Create user types
-------------------------------------------------


-------------------------------------------------
--   Create spatial units of measure
-------------------------------------------------

CREATE  SPATIAL UNIT OF MEASURE IF NOT EXISTS  "degree"
	TYPE ANGULAR
	CONVERT USING .017453292519943
go

CREATE  SPATIAL UNIT OF MEASURE IF NOT EXISTS  "meter"
	TYPE LINEAR
	CONVERT USING 1
go

CREATE  SPATIAL UNIT OF MEASURE IF NOT EXISTS  "planar degree"
	TYPE LINEAR
	CONVERT USING 111120
go


-------------------------------------------------
--   Create spatial reference systems
-------------------------------------------------

CREATE  SPATIAL REFERENCE SYSTEM IF NOT EXISTS  "Default"
	IDENTIFIED BY 0
	ORGANIZATION 'Sybase' IDENTIFIED BY 0
	LINEAR UNIT OF MEASURE "metre"
	TYPE PLANAR
	SNAP TO GRID .000001
	TOLERANCE .000001
	AXIS ORDER 'x/y/z/m'
	POLYGON FORMAT 'EvenOdd'
	COORDINATE X BETWEEN -1000000 AND 1000000
	COORDINATE Y BETWEEN -1000000 AND 1000000
go

CREATE  SPATIAL REFERENCE SYSTEM IF NOT EXISTS  "sa_octahedral_gnomonic"
	IDENTIFIED BY 2147483647
	ORGANIZATION 'Sybase' IDENTIFIED BY 2147483647
	LINEAR UNIT OF MEASURE "metre"
	TYPE PLANAR
	SNAP TO GRID .000000000001
	TOLERANCE .000000000001
	AXIS ORDER 'x/y/z/m'
	POLYGON FORMAT 'EvenOdd'
	COORDINATE X BETWEEN 0 AND 1
	COORDINATE Y BETWEEN -1 AND 1
go

CREATE  SPATIAL REFERENCE SYSTEM IF NOT EXISTS  "sa_planar_unbounded"
	IDENTIFIED BY 2147483646
	ORGANIZATION 'Sybase' IDENTIFIED BY 2147483646
	LINEAR UNIT OF MEASURE "metre"
	TYPE PLANAR
	SNAP TO GRID 0
	TOLERANCE 0
	AXIS ORDER 'x/y/z/m'
	POLYGON FORMAT 'EvenOdd'
	COORDINATE X BETWEEN -1.79769313E308 AND 1.79769313E308
	COORDINATE Y BETWEEN -1.79769313E308 AND 1.79769313E308
go

CREATE  SPATIAL REFERENCE SYSTEM IF NOT EXISTS  "WGS 84"
	IDENTIFIED BY 4326
	ORGANIZATION 'EPSG' IDENTIFIED BY 4326
	LINEAR UNIT OF MEASURE "metre"
	ANGULAR UNIT OF MEASURE "degree"
	TYPE ROUND EARTH
	SNAP TO GRID 0
	TOLERANCE 0
	ELLIPSOID SEMI MAJOR AXIS 6378137 INVERSE FLATTENING 298.257223563
	AXIS ORDER 'long/lat/z/m'
	POLYGON FORMAT 'EvenOdd'
	COORDINATE LATITUDE BETWEEN -90 AND 90
	COORDINATE LONGITUDE BETWEEN -180 AND 180
	DEFINITION 'GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4326"]]'
	TRANSFORM DEFINITION '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs'
go

CREATE  SPATIAL REFERENCE SYSTEM IF NOT EXISTS  "WGS 84 (planar)"
	IDENTIFIED BY 1000004326
	ORGANIZATION 'EPSG' IDENTIFIED BY 4326
	LINEAR UNIT OF MEASURE "planar degree"
	ANGULAR UNIT OF MEASURE "degree"
	TYPE PLANAR
	SNAP TO GRID .000000001
	TOLERANCE .000000001
	ELLIPSOID SEMI MAJOR AXIS 6378137 INVERSE FLATTENING 298.257223563
	AXIS ORDER 'long/lat/z/m'
	POLYGON FORMAT 'EvenOdd'
	COORDINATE LATITUDE BETWEEN -90 AND 90
	COORDINATE LONGITUDE BETWEEN -180 AND 180
	DEFINITION 'GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4326"]]'
	TRANSFORM DEFINITION '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs'
go


-------------------------------------------------
--   Create group memberships
-------------------------------------------------


-------------------------------------------------
--   Create remote servers
-------------------------------------------------


-------------------------------------------------
--   Create dbspace permissions
-------------------------------------------------

begin
    for dbspaces as dbcurs cursor for 
	select privilege_type, dbspace_name, user_name 
		from SYS.SYSDBSPACEPERM p 
		join SYS.SYSDBSPACE d on p.dbspace_id = d.dbspace_id
		join SYS.SYSUSER u on u.user_id = p.grantee
    do
	execute immediate 'revoke ' + if privilege_type = 1 then 'CREATE' else 'UNKNOWN' endif + ' on "' + dbspace_name + '" from "' + user_name + '"'
    end for;
end

go

grant CREATE on "system" to "PUBLIC"
go

grant CREATE on "temporary" to "PUBLIC"
go


-------------------------------------------------
--   Create external environments
-------------------------------------------------

IF EXISTS( SELECT * FROM SYS.SYSEXTERNENV WHERE name = 'java' ) THEN 
    ALTER EXTERNAL ENVIRONMENT "java"
        LOCATION '' 
END IF 
go

IF EXISTS( SELECT * FROM SYS.SYSEXTERNENV WHERE name = 'perl' ) THEN 
    ALTER EXTERNAL ENVIRONMENT "perl"
        LOCATION 'perl' 
END IF 
go

IF EXISTS( SELECT * FROM SYS.SYSEXTERNENV WHERE name = 'clr' ) THEN 
    ALTER EXTERNAL ENVIRONMENT "clr"
        LOCATION 'dbextclr[VER_MAJOR]' 
END IF 
go

IF EXISTS( SELECT * FROM SYS.SYSEXTERNENV WHERE name = 'php' ) THEN 
    ALTER EXTERNAL ENVIRONMENT "php"
        LOCATION 'php' 
END IF 
go

IF EXISTS( SELECT * FROM SYS.SYSEXTERNENV WHERE name = 'c_esql32' ) THEN 
    ALTER EXTERNAL ENVIRONMENT "c_esql32"
        LOCATION 'bin32[SLASH]dbexternc[VER_MAJOR]' 
END IF 
go

IF EXISTS( SELECT * FROM SYS.SYSEXTERNENV WHERE name = 'c_odbc32' ) THEN 
    ALTER EXTERNAL ENVIRONMENT "c_odbc32"
        LOCATION 'bin32[SLASH]dbexternc[VER_MAJOR]' 
END IF 
go

IF EXISTS( SELECT * FROM SYS.SYSEXTERNENV WHERE name = 'c_esql64' ) THEN 
    ALTER EXTERNAL ENVIRONMENT "c_esql64"
        LOCATION 'bin64[SLASH]dbexternc[VER_MAJOR]' 
END IF 
go

IF EXISTS( SELECT * FROM SYS.SYSEXTERNENV WHERE name = 'c_odbc64' ) THEN 
    ALTER EXTERNAL ENVIRONMENT "c_odbc64"
        LOCATION 'bin64[SLASH]dbexternc[VER_MAJOR]' 
END IF 
go

IF EXISTS( SELECT * FROM SYS.SYSEXTERNENV WHERE name = 'dbmlsync' ) THEN 
    ALTER EXTERNAL ENVIRONMENT "dbmlsync"
        LOCATION '' 
END IF 
go


-------------------------------------------------
--   Create external environment objects
-------------------------------------------------

create temporary procedure sa_unload_display_table_status( 
    msgid int, ord int, numtabs int, user_name char(128), table_name char(128) )
begin 
  declare @fullmsg long varchar; 
  set @fullmsg = lang_message( msgid ) ||
      ' (' || ord || '/' || numtabs || ') ' ||
      '"' || user_name || '"."' || table_name || '"'; 
  message @fullmsg type info to client; 
end
go


-------------------------------------------------
--   Create tables
-------------------------------------------------

CREATE TABLE "DBA"."utilisateurs" (
    "userId "                        int NOT NULL DEFAULT autoincrement
   ,"nom"                            varchar(50) NOT NULL
   ,"prenom"                         varchar(50) NOT NULL
   ,"adresse mail"                   varchar(50) NOT NULL
   ,"mot de passe "                  varchar(50) NOT NULL
   ,"telephone"                      varchar(12) NOT NULL
   ,"preference "                    varchar(50) NOT NULL
   ,PRIMARY KEY ("userId ") 
)
go

ALTER TABLE "DBA"."utilisateurs"
    ADD UNIQUE ( "userId " )
go

CREATE TABLE "DBA"."demandes" (
    "askId  "                        int NOT NULL DEFAULT autoincrement
   ,"userId"                         int NOT NULL
   ,"helpId"                         int NOT NULL
   ,"nom "                           varchar(50) NOT NULL
   ,"description"                    long varchar NOT NULL
   ,PRIMARY KEY ("askId  ") 
)
go

ALTER TABLE "DBA"."demandes"
    ADD UNIQUE ( "askId  " )
go

CREATE TABLE "DBA"."aides" (
    "helpId"                         int NOT NULL
   ,"categories "                    varchar(50) NOT NULL
   ,PRIMARY KEY ("helpId") 
)
go

ALTER TABLE "DBA"."aides"
    ADD UNIQUE ( "helpId" )
go

ALTER TABLE "DBA"."aides"
    ADD UNIQUE ( "categories " )
go


-------------------------------------------------
--   Reload column statistics
-------------------------------------------------


-------------------------------------------------
--   Reload data
-------------------------------------------------

call sa_unload_display_table_status( 17737, 1, 3, 'DBA', 'utilisateurs' )
go

LOAD TABLE "DBA"."utilisateurs" ("userId ","nom","prenom","adresse mail","mot de passe ","telephone","preference ")
    FROM 'E:/Users/Maxime/Documents/GitHub/Projet-d-Integration/backend/unload/720.dat'
    FORMAT 'TEXT' QUOTES ON
    ORDER OFF ESCAPES ON
    CHECK CONSTRAINTS OFF COMPUTES OFF
    STRIP OFF DELIMITED BY ','
    ENCODING 'windows-1252'
go

call sa_unload_display_table_status( 17737, 2, 3, 'DBA', 'demandes' )
go

LOAD TABLE "DBA"."demandes" ("askId  ","userId","helpId","nom ","description")
    FROM 'E:/Users/Maxime/Documents/GitHub/Projet-d-Integration/backend/unload/721.dat'
    FORMAT 'TEXT' QUOTES ON
    ORDER OFF ESCAPES ON
    CHECK CONSTRAINTS OFF COMPUTES OFF
    STRIP OFF DELIMITED BY ','
    ENCODING 'windows-1252'
go

call sa_unload_display_table_status( 17737, 3, 3, 'DBA', 'aides' )
go

LOAD TABLE "DBA"."aides" ("helpId","categories ")
    FROM 'E:/Users/Maxime/Documents/GitHub/Projet-d-Integration/backend/unload/722.dat'
    FORMAT 'TEXT' QUOTES ON
    ORDER OFF ESCAPES ON
    CHECK CONSTRAINTS OFF COMPUTES OFF
    STRIP OFF DELIMITED BY ','
    ENCODING 'windows-1252'
go

commit work
go


-------------------------------------------------
--   Create text configurations
-------------------------------------------------


-------------------------------------------------
--   Create materialized views
-------------------------------------------------

commit
go



-------------------------------------------------
--   Create indexes
-------------------------------------------------

call sa_unload_display_table_status( 17738, 1, 3, 'DBA', 'utilisateurs' )
go

call sa_unload_display_table_status( 17738, 2, 3, 'DBA', 'demandes' )
go

ALTER TABLE "DBA"."demandes"
    ADD NOT NULL FOREIGN KEY "utilisateurs" ("userId")
    REFERENCES "DBA"."utilisateurs" ("userId ")
    
go

ALTER TABLE "DBA"."demandes"
    ADD NOT NULL FOREIGN KEY "aides" ("helpId")
    REFERENCES "DBA"."aides" ("helpId")
    
go

call sa_unload_display_table_status( 17738, 3, 3, 'DBA', 'aides' )
go

commit work
go


-------------------------------------------------
--   Create immediate materialized views
-------------------------------------------------

commit
go



-------------------------------------------------
--   Create functions
-------------------------------------------------

commit
go


create function DBA.getPath()
returns long varchar
deterministic
begin
  declare dbPath long varchar; -- chemin de la db
  declare dbName long varchar; -- nom de la db
  set dbPath = (select db_property('file'));
  set dbName = (select db_property('name'))+'.db';
  set dbPath = "left"(dbPath,locate(dbPath,'\\backend',-1))+'frontend\\';
  return dbPath
end
go

COMMENT TO PRESERVE FORMAT ON PROCEDURE "DBA"."getPath" IS 
{create FUNCTION DBA."getPath"()
returns long varchar
deterministic
begin
  declare dbPath long varchar; -- chemin de la db
  declare dbName long varchar; -- nom de la db

  set dbPath = (select db_property ('file'));   
  set dbName = (select db_property('name')) + '.db';
  set dbPath = left(dbPath,locate(dbPath,'\backend',-1)) + 'frontend\';

  return dbPath;
end
}
go


-------------------------------------------------
--   Create views
-------------------------------------------------

commit
go


SET TEMPORARY OPTION force_view_creation='ON'
go

SET TEMPORARY OPTION force_view_creation='OFF'
go

call dbo.sa_recompile_views(1)
go


-------------------------------------------------
--   Create user messages
-------------------------------------------------


-------------------------------------------------
--   Create procedures
-------------------------------------------------

commit
go


create procedure DBA.http_getCSS( in url char(255) ) 
begin
  call sa_set_http_header('Content-Type','text/css');
  call sa_set_http_header('Access-Control-Allow-Origin','*');
  select xp_read_file(dba.getPath() || 'css\\' || url)
end
go

COMMENT TO PRESERVE FORMAT ON PROCEDURE "DBA"."http_getCSS" IS 
{create PROCEDURE DBA."http_getCSS"(in url char(255))
begin
  call sa_set_http_header('Content-Type', 'text/css');
  call sa_set_http_header('Access-Control-Allow-Origin', '*');
	select xp_read_file(dba.getPath() || 'css\' || url);
END
}
go

create procedure DBA.http_getIMG( in url char(255) ) 
begin
  call sa_set_http_header('Content-Type','image/png');
  call sa_set_http_header('Access-Control-Allow-Origin','*');
  select xp_read_file(dba.getPath() || 'img\\' || url)
end
go

COMMENT TO PRESERVE FORMAT ON PROCEDURE "DBA"."http_getIMG" IS 
{create PROCEDURE DBA."http_getIMG"(in url char(255))
begin
  call sa_set_http_header('Content-Type', 'image/png');
  call sa_set_http_header('Access-Control-Allow-Origin', '*');
	select xp_read_file(dba.getPath() || 'img\' || url);
end
}
go

create procedure DBA.http_getJS( in url char(255) ) 
begin
  call sa_set_http_header('Content-Type','application/javascript');
  call sa_set_http_header('Access-Control-Allow-Origin','*');
  select xp_read_file(dba.getPath() || 'js\\' || url)
end
go

COMMENT TO PRESERVE FORMAT ON PROCEDURE "DBA"."http_getJS" IS 
{create PROCEDURE DBA."http_getJS"(in url char(255))
begin
  call sa_set_http_header('Content-Type', 'application/javascript');
  call sa_set_http_header('Access-Control-Allow-Origin', '*');
	select xp_read_file(dba.getPath() || 'js\' || url);
end
}
go

create procedure DBA.http_getPage( in url char(255) ) 
begin
  call sa_set_http_header('Content-Type','text/html; charset=utf-8');
  call sa_set_http_header('Access-Control-Allow-Origin','*');
  select xp_read_file(dba.getPath() || url || '.html')
end
go

COMMENT TO PRESERVE FORMAT ON PROCEDURE "DBA"."http_getPage" IS 
{create PROCEDURE DBA."http_getPage"(in url char(255))
begin
  call sa_set_http_header('Content-Type', 'text/html; charset=utf-8');
  call sa_set_http_header('Access-Control-Allow-Origin', '*'); 
  select xp_read_file(dba.getPath() || url || '.html'); 
end
}
go

begin 
  declare prev_count int;
  declare new_count int;
  declare local temporary table dependent_proc ( 
    proc_id    unsigned int    not null, 
    primary key (proc_id) 
  ) in system not transactional; 
  set prev_count = -1;
  lp: loop
      truncate table dependent_proc;
      insert into dependent_proc 
	select proc_id from SYS.SYSPROCEDURE p 
	where exists (select * from SYS.SYSPROCPARM pp 
	    where pp.proc_id = p.proc_id 
	    and parm_name = 'expression' 
	    and parm_type = 1 
	   and domain_id = 1); 
      select count(*) into new_count from dependent_proc;
      if new_count = 0 or (new_count >= prev_count and prev_count >= 0) then
        leave lp;
      end if;
      set prev_count = new_count;
      for l1 as c1 cursor for 
	select u.user_name, proc_name
	from SYS.SYSPROCEDURE p
	    join dependent_proc d on (d.proc_id = p.proc_id)
	    join SYS.SYSUSER u on (p.creator = u.user_id)
      do
        begin
	   execute immediate with quotes on
            'alter procedure "' || user_name || '"."' || proc_name || '" recompile';
          exception when others then
        end
      end for;
  end loop;
end

go


-------------------------------------------------
--   Create sequences
-------------------------------------------------

call dbo.sa_recompile_views(0)
go


-------------------------------------------------
--   Create triggers
-------------------------------------------------

commit
go



-------------------------------------------------
--   Create SQL Remote definitions
-------------------------------------------------


-------------------------------------------------
--   Create MobiLink definitions
-------------------------------------------------


-------------------------------------------------
--   Create Synchronization profiles
-------------------------------------------------


-------------------------------------------------
--   Create logins
-------------------------------------------------


-------------------------------------------------
--   Create events
-------------------------------------------------

commit
go



-------------------------------------------------
--   Create services
-------------------------------------------------

commit
go


CREATE SERVICE "root" 
    TYPE 'RAW' AUTHORIZATION ON SECURE OFF URL PATH ON USING "METHODS=GET"  AS
call DBA.http_getPage(:url)
go


-------------------------------------------------
--   Create mirror options and servers
-------------------------------------------------


-------------------------------------------------
--   Set DBA password
-------------------------------------------------

GRANT CONNECT TO DBA IDENTIFIED BY ENCRYPTED '\x01\x26\x61\x9d\x40\xd7\x82\xbb\x5f\xaa\x74\xf4\x4c\x63\xa4\x21\x4f\x69\xf2\x76\xb6\xbe\xae\x38\x77\x46\x90\x0c\x17\xf1\x3e\x6e\xd1\x0d\x8f\x03\x74'
go


-------------------------------------------------
--   Create options
-------------------------------------------------

SET OPTION date_order =
go

SET OPTION PUBLIC.preserve_source_format =
go

SET OPTION "PUBLIC"."preserve_source_format"='On'
go
