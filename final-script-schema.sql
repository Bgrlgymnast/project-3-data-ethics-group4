drop table if exists covid;
drop table if exists cleanuspop;
drop table if exists uspop;
drop table if exists statetotals;
drop table if exists txtotals;
drop table if exists ussextotals;
drop table if exists ustotals;

create table covid(
id INTEGER,
"Data As Of" DATE ,
"Totals By" Varchar(20),
STATE Varchar(50)primary key,
Sex Varchar(20),
"Age Group" Varchar(20),
"COVID-19 Deaths" int,
"Total Deaths" int,
"Pneumonia Deaths" int,
"Influenza Deaths" int,
);

create table cleanuspop(
FIELD1 int,
id INTEGER  primary key,
STATE varchar(50),
Pop_2020 int,
LATITUDE int,
LONGITUDE int,
"Data As Of" DATE,
Sex Varchar(20),
"Age Group" Varchar(20),
"COVID-19 Deaths" int,
"Total Deaths" int,
"Pneumonia Deaths" int,
"Influenza Deaths" int,
foreign key (State) references covid(STATE)
);

-- not using tables tables below
-- created them for ERD, however unable to import all data without errors, ran out of time for class project to fix

create table uspop(
id INTEGER PRIMARY key,
STATE Varchar(50),
April_1_2020 int,
"2020" int,
"2021" int,
"2022" int,
"2023" int,
foreign key (STATE) references covid(STATE)
);

create table statetotals(
id INTEGER,
"Data As Of" DATE,
"Totals By" Varchar(20),
STATE Varchar(50),
Sex Varchar(20),
"Age Group" Varchar(20),
"COVID-19 Deaths" int primary key,
"Total Deaths" int,
"Pneumonia Deaths" int,
"Influenza Deaths" int,
foreign key (STATE) references covid(STATE)
);


create table txtotals(
id INTEGER,
"Data As Of" DATE ,
"Totals By" Varchar(20),
STATE Varchar(50),
Sex Varchar(20),
"Age Group" Varchar(20),
"COVID-19 Deaths" int,
"Total Deaths" int primary key,
"Pneumonia Deaths" int,
"Influenza Deaths" int,
foreign key (STATE) references covid(STATE)
);

create table ussextotals(
id INTEGER,
"Data As Of" DATE ,
"Totals By" Varchar(20),
STATE Varchar(50),
Sex Varchar(20),
"Age Group" Varchar(20),
"COVID-19 Deaths" int,
"Total Deaths" int,
"Pneumonia Deaths" int primary key,
"Influenza Deaths" int,
foreign key (STATE) references covid(STATE)
);

create table ustotals(
id INTEGER,
"Data As Of" DATE ,
"Totals By" Varchar(20),
STATE Varchar(50),
Sex Varchar(20),
"Age Group" Varchar(20),
"COVID-19 Deaths" int,
"Total Deaths" int,
"Pneumonia Deaths" int,
"Influenza Deaths" int primary key,
foreign key (STATE) references covid(STATE)
);

-- check to see if imports work
select *
from covid;
select *
from cleanuspop;
select *
from uspop;
select *
from statetotals;
select *
from txtotals;
select *
from ussextotals;
select *
from ustotals;