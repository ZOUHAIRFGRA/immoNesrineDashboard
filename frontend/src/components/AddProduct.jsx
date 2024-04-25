import  { useState, useEffect } from 'react';
import {
  TextField,
    InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
} from '@mui/material';
import axios from 'axios';
import { styled } from "@mui/system";

const FormContainer = styled("form")({
  maxWidth: "600px",
  margin: "auto",
});

const StyledFormControl = styled("div")({
  marginBottom: "20px",
});
const AddProductForm = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    brand: '',
    specifications: '',
    price: '',
    tax: '',
  });

  // State for category and brand data
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  // Fetch category and brand data on component mount
  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_API_URL}/api/admin/categories`)
      .then(response => response.json())
      .then(data => setCategories(data.categories));

    fetch(`${import.meta.env.VITE_APP_API_URL}/api/admin/brands`)
      .then(response => response.json())
      .then(data => setBrands(data.brands));
  }, []);

  // Handle form field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/admin/products`,
        formData
      );
      setFormData({name: '',
      description: '',
      category: '',
      brand: '',
      specifications: '',
      price: '',
      tax: '',})

      console.log("Product created:", response.data);
    console.log(formData);
  };

  return (
    <FormContainer onSubmit={handleSubmit} className="w-full">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <StyledFormControl>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              fullWidth
            
            >
              {categories.map(category => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <StyledFormControl>
            <InputLabel>Brand</InputLabel>
            <Select
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              fullWidth
           
            >
              {brands.map(brand => (
                <MenuItem key={brand._id} value={brand._id}>
                  {brand.name}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Specifications"
            name="specifications"
            value={formData.specifications}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Tax"
            name="tax"
            value={formData.tax}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Add Product
          </Button>
        </Grid>
      </Grid>
    </FormContainer>
  );
};

export default AddProductForm;
