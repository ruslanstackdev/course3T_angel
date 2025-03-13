"use client";

import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  InputAdornment,
  Container,
} from "@mui/material";
import {
  Search as SearchIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Language as GlobeIcon,
  Business as BuildingIcon,
} from "@mui/icons-material";
import { useState } from "react";

const fundingPartners = [
  {
    id: 1,
    name: "Investor A",
    type: "Private Investor",
    description: "Experienced real estate investor looking for opportunities.",
    phone: "123-456-7890",
    email: "investorA@example.com",
    website: "https://www.investorA.com",
  },
  {
    id: 2,
    name: "Investor B",
    type: "Private Investor",
    description: "Real estate investor with a focus on commercial properties.",
    phone: "987-654-3210",
    email: "investorB@example.com",
    website: "https://www.investorB.com",
  },
  {
    id: 3,
    name: "Investor C",
    type: "Private Investor",
    description: "Investor with a passion for multifamily housing.",
    phone: "555-123-4567",
    email: "investorC@example.com",
    website: "https://www.investorC.com",
  },
  {
    id: 4,
    name: "Investor D",
    type: "Private Investor",
    description: "Experienced real estate investor looking for opportunities.",
    phone: "123-456-7890",
    email: "investorA@example.com",
    website: "https://www.investorA.com",
  },
  {
    id: 5,
    name: "Investor E",
    type: "Private Investor",
    description: "Real estate investor with a focus on commercial properties.",
    phone: "987-654-3210",
    email: "investorB@example.com",
    website: "https://www.investorB.com",
  },
  {
    id: 6,
    name: "Investor F",
    type: "Private Investor",
    description: "Investor with a passion for multifamily housing.",
    phone: "555-123-4567",
    email: "investorC@example.com",
    website: "https://www.investorC.com",
  },
];

export default function FundingPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPartners = fundingPartners.filter(
    (partner) =>
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Funding Directory
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Connect with trusted funding partners for your real estate investments
          </Typography>
        </Box>

        <TextField
          fullWidth
          placeholder="Search by name, type, or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 4 }}
        />

        <Grid container spacing={3}>
          {filteredPartners.map((partner) => (
            <Grid item xs={12} md={6} lg={4} key={partner.id}>
              <Card>
                <CardContent>
                  <Box sx={{ mb: 2, pb: 2, borderBottom: 1, borderColor: 'divider' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <BuildingIcon sx={{ color: 'success.main' }} />
                      <Typography variant="h6">{partner.name}</Typography>
                    </Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      {partner.type}
                    </Typography>
                  </Box>

                  <Typography variant="body2" sx={{ mb: 3 }}>
                    {partner.description}
                  </Typography>

                  <Box sx={{ pt: 2, borderTop: 1, borderColor: 'divider' }}>
                    <Button
                      variant="contained"
                      fullWidth
                      color="success"
                      startIcon={<PhoneIcon />}
                      onClick={() => window.location.href = `tel:${partner.phone}`}
                      sx={{ mb: 2 }}
                    >
                      Call Now
                    </Button>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<EmailIcon />}
                        onClick={() => window.location.href = `mailto:${partner.email}`}
                      >
                        Email
                      </Button>
                      <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<GlobeIcon />}
                        onClick={() => window.open(partner.website, "_blank")}
                      >
                        Website
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}