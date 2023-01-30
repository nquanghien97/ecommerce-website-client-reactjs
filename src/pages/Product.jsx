import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useDispatch } from 'react-redux';
import { AddCart, AddWishList } from '../redux/Products/actions';
import { mobile } from '../responsive';
import { getProduct } from '../api/productServices';

function Product(props) {

  const { id } = useParams();

  const dispatch = useDispatch();

  const [product, setProduct] = useState();

  const addCart = (item) => {
    dispatch(AddCart(item))
  }

  const addWishList = (item) => {
    dispatch(AddWishList(item))
  }

  useEffect(() => {
    const fetchProduct = async () => {
      await getProduct(id)
      .then(data => setProduct(data.data.product))
      .catch(err => console.log(err.message))
    }
    fetchProduct()
  },[id])

  console.log(product)
  if(!product) {
    return <div>Loading...</div>
  }
  return (
    <Container>
      <Left>
        <Image src={product.imageUrl} />
      </Left>
      <Right>
        <Description>
          <Title>{product.name}</Title>
          <Price>{Number(product.price).toLocaleString('en-US')}đ</Price>
        </Description>
        <BuySection>
          <Size>

          </Size>
          <AddWrapper>
            <AddCard onClick={()=> addCart(product)}>
              Thêm vào giỏ hàng
            </AddCard>
            <AddWishListWrapper>
              <FavoriteBorderIcon onClick={()=> addWishList(product)} style={{ fontSize:'32px'}} />
            </AddWishListWrapper>
          </AddWrapper>
        </BuySection>
      </Right>
    </Container>
  )
}

 
const Container = styled.div`
  display: flex;
  margin-top: 110px;
  ${mobile({
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '152px',
  })}
`
const Left = styled.div`
  display: flex;
  justify-content: center;
  flex: 60%;
  padding: 20px;
  ${mobile({
    maxWidth: '550px',
  })}
`
const Image = styled.img`
  width: 60%;
  border: 1px solid;
  border-radius: 4px;
  ${mobile({
    width: '100%',
  })}
`
const Right = styled.div`
  display: flex;
  flex-direction: column;
  flex: 30%;
  padding: 20px;
  margin-right: 80px;
  ${mobile({
    marginRight: '0 !important',
  })}
`
const Description = styled.div`
  width: 100%;
`
const Title = styled.h1`
  margin-bottom: 12px;
`
const Price = styled.p`
  font-size: 24px;
  margin-bottom: 12px;
`
const BuySection = styled.div`

`
const Size = styled.div`

`
const AddWrapper = styled.div`
  display: flex;
`
const AddCard = styled.button`
  width: 90%;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`
const AddWishListWrapper = styled.div`
  margin: 0 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border: 1px solid;
  border-radius: 4px;
  cursor: pointer;
  &:hover{
    background-color: pink;
  }
` 

export default Product;