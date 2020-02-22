import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormControl, FormGroup, FormControlLabel, Checkbox, Button } from '@material-ui/core'

import Loading from '../components/Loading'
import { getAllBrands, getBrandCat, getMostParent, assignBrandCat } from '../redux/actions'

class Test extends Component {

    state = {
        selectedBrand: null,
        selectedCategory: []
    }

    componentDidMount() {
        this.props.getMostParent()
        this.props.getAllBrands()
        this.props.getBrandCat()
    }

    onClickCategory = brandId => e => {
        let arr = []
        this.props.brandCats.forEach(i => {
            if (i.brandId === brandId) {
                arr.push(i.categoryId)
            }
        })
        this.setState({
            selectedBrand: brandId,
            selectedCategory: arr
        })
    }

    onCheckBoxChange = (e) => {
        let arr = this.state.selectedCategory
        let index = arr.indexOf(parseInt(e.target.value))
        console.log(index)
        if (index >= 0) {
            arr.splice(index, 1)
            this.setState({
                selectedCategory: arr
            })
        } else {
            this.setState({
                selectedCategory: arr.concat([parseInt(e.target.value)])
            })
        }
    }

    onSaveClick = () => {
        this.props.assignBrandCat({
            brandId: this.state.selectedBrand,
            categoryId: this.state.selectedCategory
        })
        this.props.getBrandCat()
    }

    renderAllBrands = () => {
        if (this.props.brands) {
            return this.props.brands.map(brand => (
                <ul key={brand.id}>
                    <li
                        style={this.state.selectedBrand === brand.id ? { fontWeight: 'bold' } : { cursor: 'pointer' }}
                        onClick={this.onClickCategory(brand.id)}
                    >
                        {brand.brand}
                    </li>
                </ul>
            ))
        } else {
            return <Loading />
        }
    }

    renderCheckBox = () => {
        if (this.props.mostParent) {
            return this.props.mostParent.map(cat => (
                <FormControlLabel key={cat.id}
                    control={
                        <Checkbox
                            disabled={this.state.selectedBrand ? false : true}
                            checked={this.state.selectedCategory.indexOf(cat.id) >= 0 ? true : false}
                            value={cat.id}
                            onChange={this.onCheckBoxChange}
                        />
                    }
                    label={cat.category}
                />
            ))
        } else {
            return <Loading />
        }
    }

    renderAllBrandCats = () => {
        if (this.props.mostParent && this.props.brandCats) {
            return this.props.mostParent.map(cat => (
                <div key={cat.id}>
                    <h3>{cat.category}</h3>
                    <ul >
                        {this.props.brandCats.filter(i => i.categoryId === cat.id).map((i, index) => (
                            <li key={index}>{i.brand}</li>
                        ))}
                    </ul>
                </div>
            ))
        } else {
            return <Loading />
        }
    }

    render() {
        console.log(this.state)
        return (
            <div className="testContainer">

                <div style={{ display: 'flex' }}>
                    <div style={{ padding: '50px' }}>
                        <h3>Brands:</h3>
                        <ul>
                            {this.renderAllBrands()}
                        </ul>
                    </div>

                    <FormControl style={{ padding: '50px', border: "1px solid black" }} >
                        <h3>Assign Category:</h3>
                        <FormGroup>
                            {this.renderCheckBox()}
                        </FormGroup>
                        <Button
                            color="primary"
                            variant='contained'
                            onClick={this.onSaveClick}
                        >
                            SAVE
                    </Button>
                    </FormControl>
                    <div>
                        {this.renderAllBrandCats()}
                    </div>
                </div>

            </div>
        )
    }
}

const stateToProps = ({ categories, brands }) => {
    return {
        mostParent: categories.mostParent,
        brandCats: brands.brandCats,
        brands: brands.brands
    }
}

export default connect(stateToProps, { getAllBrands, getBrandCat, getMostParent, assignBrandCat })(Test)
