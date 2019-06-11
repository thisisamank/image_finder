import React, { Component } from "react";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import axios from "axios";
import ImageResults from "../image-results/ImageResults";

class Search extends Component {
  state = {
    searchText: "",
    amount: 15,
    apiUrl: "https://pixabay.com/api",
    apiKey: "12741596-855720dd4f57e16a9ba35201f",
    images: []
  };
  onTextChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    axios
      .get(this.getParameter())
      .then(res => this.setState({ images: res.data.hits }))
      .catch(err => console.log(err));
  };

  getParameter = () => {
    return `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${
      this.state.searchText
    }&image_type=photo&per_page=${this.state.amount}&safesearch=true`;
  };

  onAmountChange = (e, index, value) => this.setState({ amount: value });
  render() {
    console.log(this.state.images);
    return (
      <div>
        <TextField
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          floatingLabelText="Search For images"
          fullWidth={true}
        />
        <br />
        <SelectField
          value={this.state.amount}
          name="amount"
          floatingLabelText="Frequency"
          onChange={this.onAmountChange}
        >
          <MenuItem value={5} primaryText="5" />
          <MenuItem value={10} primaryText="10" />
          <MenuItem value={15} primaryText="15" />
          <MenuItem value={30} primaryText="30" />
          <MenuItem value={50} primaryText="50" />
        </SelectField>
        <br />
        {this.state.images.length > 0 ? (
          <ImageResults images={this.state.images} />
        ) : null}
      </div>
    );
  }
}
export default Search;
