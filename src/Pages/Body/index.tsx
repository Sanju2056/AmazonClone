import './index.css'
import child from '/child.jpg'
import { image,topCardItems,arrayLast } from '../../../Constants'
const Body = () => {
    const ItemCard = ({item}) => {
        return (
            <div className='b-card'>
                <p className='b-card-title'>
                    {item.title}
                </p>
                <div className='b-img-div'>
                    <img
                        src={item.image}
                        className='b-img-css'
                    />
                </div>
                <p className='b-card-seeMore'>
                    See More
                </p>
            </div>
        )
    }
    const ItemCard2 = ({item}) => {
        return (
            <div className='b-card'>
                <p className='b-card-title'>
                    {item.title}
                </p>
                <div className='b-img-div'>
                    <img
                        src={item.image}
                        className='b-img-css'
                    />
                </div>
                <p className='b-card-seeMore'>
                    See More
                </p>
            </div>
        )
    }
    return (
        <div className='box-main'>
            <div className='b-container-1'>
                {
                    topCardItems.map((item)=>{
                        return <ItemCard item={item}/>
                    })
                }
            </div>
            <div className='b-container-2'>
                <p className='b-card-title'>
                    Top Sellers in Books for you
                </p>
                <div className='book-container'>
                    {
                        image.map((item) => {
                            return <div className='book-card-div'>
                                <img
                                    src={item}
                                    className='book-css'
                                />
                            </div>
                        })
                    }

                </div>

            </div>
            <div className='b-container-3'>
                <p className='b-card-title'>Exciting deals
                    <span className='span-css'>See all deals</span>
                </p>
                <div className='b-c3-card-container'>
                    <div className='b-c3-card'>
                        <div className='b-c3-img-div'>
                        <img 

/>
                        </div>
                       
                    </div>
                </div>
            </div>
            <div className='b-container-1'>
            {
                    arrayLast.map((item)=>{
                        return <ItemCard2 item={item}/>
                    })
                }

            </div>
        </div>
    )
}

export default Body