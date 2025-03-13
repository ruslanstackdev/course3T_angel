"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Add, Edit, Delete, Search } from "@mui/icons-material";
import { supabase } from "@/lib/supabase";

interface FundingPartner {
  id: string;
  name: string;
  type: string;
  description: string;
  logo_url: string;
  min_loan: number;
  max_loan: number;
  interest_rate_min: number;
  interest_rate_max: number;
  loan_terms: string;
  phone: string;
  email: string;
  website: string;
}

export default function AdminFundingPage() {
  const [partners, setPartners] = useState<FundingPartner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [newPartner, setNewPartner] = useState<Partial<FundingPartner>>({
    name: "",
    type: "",
    description: "",
    logo_url: "",
    min_loan: 0,
    max_loan: 0,
    interest_rate_min: 0,
    interest_rate_max: 0,
    loan_terms: "",
    phone: "",
    email: "",
    website: "",
  });

  useEffect(() => {
    fetchPartners();
  }, []);

  async function fetchPartners() {
    try {
      const { data, error } = await supabase
        .from("funding_partners")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPartners(data || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching partners:", error);
      setIsLoading(false);
    }
  }

  async function createPartner(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("funding_partners")
        .insert([newPartner])
        .select()
        .single();

      if (error) throw error;

      setPartners([data, ...partners]);
      setNewPartner({
        name: "",
        type: "",
        description: "",
        logo_url: "",
        min_loan: 0,
        max_loan: 0,
        interest_rate_min: 0,
        interest_rate_max: 0,
        loan_terms: "",
        phone: "",
        email: "",
        website: "",
      });
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error creating partner:", error);
    }
  }

  async function deletePartner(id: string) {
    try {
      const { error } = await supabase
        .from("funding_partners")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setPartners(partners.filter((partner) => partner.id !== id));
    } catch (error) {
      console.error("Error deleting partner:", error);
    }
  }

  const filteredPartners = partners.filter((partner) =>
    partner.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ padding: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4" component="h1">
          Funding Partners Management
        </Typography>
        <Button
          variant="contained"
          color="success"
          startIcon={<Add />}
          onClick={() => setIsDialogOpen(true)}
        >
          Add Partner
        </Button>
      </Box>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Add New Funding Partner</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={createPartner}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Partner Name"
              value={newPartner.name}
              onChange={(e) =>
                setNewPartner({ ...newPartner, name: e.target.value })
              }
              required
            />
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              value={newPartner.type}
              onChange={(e) =>
                setNewPartner({ ...newPartner, type: e.target.value })
              }
            >
              <MenuItem value="Private Lender">Private Lender</MenuItem>
              <MenuItem value="Hard Money">Hard Money</MenuItem>
              <MenuItem value="Bridge Loan">Bridge Loan</MenuItem>
              <MenuItem value="Traditional Bank">Traditional Bank</MenuItem>
            </Select>
            <TextField
              label="Description"
              multiline
              rows={4}
              value={newPartner.description}
              onChange={(e) =>
                setNewPartner({ ...newPartner, description: e.target.value })
              }
            />
            <TextField
              label="Minimum Loan ($)"
              type="number"
              value={newPartner.min_loan}
              onChange={(e) =>
                setNewPartner({
                  ...newPartner,
                  min_loan: parseInt(e.target.value),
                })
              }
            />
            <TextField
              label="Maximum Loan ($)"
              type="number"
              value={newPartner.max_loan}
              onChange={(e) =>
                setNewPartner({
                  ...newPartner,
                  max_loan: parseInt(e.target.value),
                })
              }
            />
            <TextField
              label="Min Interest Rate (%)"
              type="number"
              value={newPartner.interest_rate_min}
              onChange={(e) =>
                setNewPartner({
                  ...newPartner,
                  interest_rate_min: parseFloat(e.target.value),
                })
              }
            />
            <TextField
              label="Max Interest Rate (%)"
              type="number"
              value={newPartner.interest_rate_max}
              onChange={(e) =>
                setNewPartner({
                  ...newPartner,
                  interest_rate_max: parseFloat(e.target.value),
                })
              }
            />
            <TextField
              label="Phone"
              value={newPartner.phone}
              onChange={(e) =>
                setNewPartner({ ...newPartner, phone: e.target.value })
              }
            />
            <TextField
              label="Email"
              type="email"
              value={newPartner.email}
              onChange={(e) =>
                setNewPartner({ ...newPartner, email: e.target.value })
              }
            />
            <TextField
              label="Website"
              value={newPartner.website}
              onChange={(e) =>
                setNewPartner({ ...newPartner, website: e.target.value })
              }
            />
            <DialogActions>
              <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                Create Partner
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader
          title="All Partners"
          action={
            <TextField
              placeholder="Search partners..."
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <Search />,
              }}
            />
          }
        />
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Loan Range</TableCell>
                  <TableCell>Interest Rate</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPartners.map((partner) => (
                  <TableRow key={partner.id}>
                    <TableCell>{partner.name}</TableCell>
                    <TableCell>{partner.type}</TableCell>
                    <TableCell>
                      ${partner.min_loan.toLocaleString()} - $
                      {partner.max_loan.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {partner.interest_rate_min}% - {partner.interest_rate_max}%
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{partner.phone}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {partner.email}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => deletePartner(partner.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}