import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import * as balSheetJson from '../data/balance-sheet.json';

export type Application = {
    id: string;
	userId: string;
    createdDate: Date;
}

export type Business = {
    id: string;
	name: string;
    establishedYear: number;
	profitSummary: number;
	lossSummary: number;
	preAssessment: number;
}

export type BalanceSheet = {
	year: number;
	month: number;
	profitOrLoss: number;
	assetsValue: number;
}

const getBalSheet = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id;
	return res.send(balSheetJson);
};

const initAppln = async (req: Request, res: Response, next: NextFunction) => {
    let userId: string = req.body.userId;
    let result: Application = {
		id: Math.random().toString(16).slice(2),
		userId: userId,
		createdDate: new Date()
	}
    return res.status(200).json(result);
};

const finalOutcome = async (req: Request, res: Response, next: NextFunction) => {
    let userId: string = req.body.userId;
	let loanAmt: number = req.body.loanAmt;

	let totalAssetValue = 0;
	let avgAssetValue = 0;
	let totalProfit = 0;
	let totalLoss = 0;
	let assessmentVal = 20;

	for (var key in balSheetJson) {
		if (balSheetJson.hasOwnProperty(key)) {
			if(balSheetJson[key].year == 2020) {
				totalAssetValue += balSheetJson[key].assetsValue;
				if(balSheetJson[key].profitOrLoss >= 0) {
					totalProfit += balSheetJson[key].profitOrLoss;
				}
				else {
					totalLoss -= balSheetJson[key].profitOrLoss;
				}
			}
		}
	 } 

	avgAssetValue = totalAssetValue / 12;
	if(totalProfit > 0) {
		assessmentVal = 60;
	}
	if(avgAssetValue > loanAmt) {
		assessmentVal = 100;
	}

	let result: Business = {
		id: Math.random().toString(16).slice(2),
		name: 'ABC Business',
		establishedYear: 2020,
		profitSummary: totalProfit,
		lossSummary: totalLoss,
		preAssessment: assessmentVal
	}
	let msg = '';
	if(result.preAssessment == 100) {
		msg = "Your loan is approved!";
	}
	else {
		msg = "You have " + result.preAssessment + "% chance of approval of loan.";
	}
	return res.status(200).send(msg);
};

export default { getBalSheet, initAppln, finalOutcome };