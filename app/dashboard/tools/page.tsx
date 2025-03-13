"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Tabs,
  Tab,
  Grid,
  Paper,
} from "@mui/material";
import {
  Calculate as CalculatorIcon,
  Home as HomeIcon,
  AttachMoney as DollarSignIcon,
  Group as UsersIcon,
  Business as BuildingIcon,
  Search as SearchIcon,
  ArrowForward as ArrowRightIcon,
} from "@mui/icons-material";

export default function ToolsPage() {
  const [mortgageAmount, setMortgageAmount] = useState("200000");
  const [interestRate, setInterestRate] = useState("4.5");
  const [loanTerm, setLoanTerm] = useState("30");
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [section8Rent, setSection8Rent] = useState("");
  const [propertyValue, setPropertyValue] = useState("");
  const [repairCosts, setRepairCosts] = useState("");
  const [section8Analysis, setSection8Analysis] = useState<any>(null);
  const [wholesaleArv, setWholesaleArv] = useState("");
  const [repairEstimate, setRepairEstimate] = useState("");
  const [wholesaleAnalysis, setWholesaleAnalysis] = useState<any>(null);
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const calculateMortgage = () => {
    const principal = parseFloat(mortgageAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const payments = parseFloat(loanTerm) * 12;

    const x = Math.pow(1 + rate, payments);
    const monthly = (principal * x * rate) / (x - 1);

    setMonthlyPayment(monthly);
  };

  const analyzeSection8 = () => {
    const monthlyRent = parseFloat(section8Rent);
    const propertyValueNum = parseFloat(propertyValue);
    const repairCostsNum = parseFloat(repairCosts);

    const totalInvestment = propertyValueNum + repairCostsNum;
    const annualRent = monthlyRent * 12;
    const operatingExpenses = annualRent * 0.4; // Estimated 40% for expenses
    const noi = annualRent - operatingExpenses;
    const roi = (noi / totalInvestment) * 100;

    setSection8Analysis({
      monthlyRent,
      noi,
      totalInvestment,
      roi,
    });
  };

  const analyzeWholesale = () => {
    const arv = parseFloat(wholesaleArv);
    const repairs = parseFloat(repairEstimate);
    const maxAllowedOffer = arv * 0.7 - repairs;
    const suggestedOffer = maxAllowedOffer * 0.9;
    const potentialProfit = maxAllowedOffer - suggestedOffer;

    setWholesaleAnalysis({
      arv,
      maxAllowedOffer,
      suggestedOffer,
      potentialProfit,
    });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Investment Tools
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Calculate and analyze your real estate investments
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab icon={<CalculatorIcon />} label="Mortgage" />
          <Tab icon={<HomeIcon />} label="Section 8" />
          <Tab icon={<BuildingIcon />} label="Wholesale" />
        </Tabs>
      </Box>

      <Box sx={{ mt: 3 }}>
        {currentTab === 0 && (
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <CalculatorIcon />
                <Typography variant="h6">Mortgage Calculator</Typography>
              </Box>

              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Loan Amount ($)"
                    type="number"
                    value={mortgageAmount}
                    onChange={(e) => setMortgageAmount(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Interest Rate (%)"
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Loan Term (Years)"
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                  />
                </Grid>
              </Grid>

              <Button
                variant="contained"
                fullWidth
                color="success"
                onClick={calculateMortgage}
              >
                Calculate Payment
              </Button>

              {monthlyPayment && (
                <Paper sx={{ mt: 3, p: 2, bgcolor: 'grey.100' }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>Monthly Payment</Typography>
                  <Typography variant="h4" color="success.main">
                    ${monthlyPayment.toFixed(2)}
                  </Typography>
                </Paper>
              )}
            </CardContent>
          </Card>
        )}

        {currentTab === 1 && (
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <HomeIcon />
                <Typography variant="h6">Section 8 Deal Analyzer</Typography>
              </Box>

              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Expected Monthly Rent ($)"
                    type="number"
                    value={section8Rent}
                    onChange={(e) => setSection8Rent(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Property Value ($)"
                    type="number"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Repair Costs ($)"
                    type="number"
                    value={repairCosts}
                    onChange={(e) => setRepairCosts(e.target.value)}
                  />
                </Grid>
              </Grid>

              <Button
                variant="contained"
                fullWidth
                color="success"
                onClick={analyzeSection8}
              >
                Analyze Deal
              </Button>

              {section8Analysis && (
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 2, bgcolor: 'grey.100' }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Monthly Rental Income
                        </Typography>
                        <Typography variant="h5" color="success.main">
                          ${section8Analysis.monthlyRent.toFixed(2)}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 2, bgcolor: 'grey.100' }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Annual NOI
                        </Typography>
                        <Typography variant="h5" color="success.main">
                          ${section8Analysis.noi.toFixed(2)}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 2, bgcolor: 'grey.100' }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Total Investment
                        </Typography>
                        <Typography variant="h5">
                          ${section8Analysis.totalInvestment.toFixed(2)}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 2, bgcolor: 'grey.100' }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Cash on Cash ROI
                        </Typography>
                        <Typography variant="h5" color="success.main">
                          {section8Analysis.roi.toFixed(2)}%
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </CardContent>
          </Card>
        )}

        {currentTab === 2 && (
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <BuildingIcon />
                <Typography variant="h6">Wholesale Deal Calculator</Typography>
              </Box>

              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="After Repair Value ($)"
                    type="number"
                    value={wholesaleArv}
                    onChange={(e) => setWholesaleArv(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Repair Estimate ($)"
                    type="number"
                    value={repairEstimate}
                    onChange={(e) => setRepairEstimate(e.target.value)}
                  />
                </Grid>
              </Grid>

              <Button
                variant="contained"
                fullWidth
                color="success"
                onClick={analyzeWholesale}
              >
                Calculate Deal
              </Button>

              {wholesaleAnalysis && (
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 2, bgcolor: 'grey.100' }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Maximum Allowable Offer
                        </Typography>
                        <Typography variant="h5" color="success.main">
                          ${wholesaleAnalysis.maxAllowedOffer.toFixed(2)}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 2, bgcolor: 'grey.100' }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Suggested Offer
                        </Typography>
                        <Typography variant="h5" color="success.main">
                          ${wholesaleAnalysis.suggestedOffer.toFixed(2)}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 2, bgcolor: 'grey.100' }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Potential Profit
                        </Typography>
                        <Typography variant="h5" color="success.main">
                          ${wholesaleAnalysis.potentialProfit.toFixed(2)}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 2, bgcolor: 'grey.100' }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          70% ARV Rule
                        </Typography>
                        <Typography variant="h5">
                          ${(wholesaleAnalysis.arv * 0.7).toFixed(2)}
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
}