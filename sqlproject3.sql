drop table if exists uspop;
drop table if exists covid;
drop table if exists statetotals;
drop table if exists txtotals;
drop table if exists ussextotals;
drop table if exists ustotals;

create table uspop(
id INTEGER PRIMARY key,
State Varchar(50),
April_1_2020 int,
"2020" int,
"2021" int,
"2022" int,
"2023" int
);

create table covid(
id INTEGER,
"Data As Of" DATE ,
"Totals By" Varchar(20),
State Varchar(50),
Sex Varchar(20),
"Age Group" Varchar(20),
"COVID-19 Deaths" int,
"Total Deaths" int,
"Pneumonia Deaths" int,
"Influenza Deaths" int
);

create table statetotals(
id INTEGER,
"Data As Of" DATE ,
"Totals By" Varchar(20),
State Varchar(50),
Sex Varchar(20),
"Age Group" Varchar(20),
"COVID-19 Deaths" int,
"Total Deaths" int,
"Pneumonia Deaths" int,
"Influenza Deaths" int
);

create table txtotals(
id INTEGER,
"Data As Of" DATE ,
"Totals By" Varchar(20),
State Varchar(50),
Sex Varchar(20),
"Age Group" Varchar(20),
"COVID-19 Deaths" int,
"Total Deaths" int,
"Pneumonia Deaths" int,
"Influenza Deaths" int
);

create table ussextotals(
id INTEGER,
"Data As Of" DATE ,
"Totals By" Varchar(20),
State Varchar(50),
Sex Varchar(20),
"Age Group" Varchar(20),
"COVID-19 Deaths" int,
"Total Deaths" int,
"Pneumonia Deaths" int,
"Influenza Deaths" int
);

create table ustotals(
id INTEGER,
"Data As Of" DATE ,
"Totals By" Varchar(20),
State Varchar(50),
Sex Varchar(20),
"Age Group" Varchar(20),
"COVID-19 Deaths" int,
"Total Deaths" int,
"Pneumonia Deaths" int,
"Influenza Deaths" int
);

-- check to see if imports work
select * 
from covid;
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




