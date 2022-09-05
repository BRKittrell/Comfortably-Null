DROP DATABASE IF EXISTS ATRs;
DROP TABLE IF EXISTS Ammunition_Transactions;
CREATE DATABASE ATRs;


CREATE TABLE Ammunition_Transactions (
ATR serial PRIMARY KEY,
Rank_Rate text,
First_Name text,
Last_Name text,
DODIC char(4),
NIIN char(9),
Lot_Number text,
Condition_Code char(1),
Transaction_Code char(2),
Source_Code text,
Document_Number char(14),
Consignee char(6),
Consignor char(6),
Transaction_Quantity integer,
Comments char(50)
);

INSERT INTO Ammunition_Transactions (Rank_Rate, First_Name, Last_Name, DODIC, NIIN, Lot_Number, Condition_Code, Transaction_Code, Source_Code, Document_Number, Consignee, Consignor, Transaction_Quantity, Comments) VALUES ('GMCS', 'Brandon', 'Kittrell', 'A011', '123456789', 'WCC89D001-224', 'A', 'F', 'Src Code', 'no doc', 'N/A', 'N/A', 100, 'MLE training.');