import banner from '../assets/banner.jpg'
import bannerMobile from '../assets/banner-mobile.jpg'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { validUrlConvert } from '../utils/validUrlConvert'
const Home = () => {
  const navigate = useNavigate()
  const loadingCategory = useSelector(state => state.products.loadingCategory)
  const categoryData = useSelector(state => state.products.allCategory)
  const subCategoryData = useSelector(state => state.products.allSubCategory)
  const handleRedirectProductListPage = (id, name) => {
    console.log(id, name);
    const subCategory = subCategoryData.find(sub => {
      const filterData = sub.category.some(c => {
        return c._id == id
      })
      return filterData ? true : null
    })
    const url = `/${validUrlConvert(name)}-${id}/${validUrlConvert(subCategory.name)}-${subCategory._id}`
    navigate(url)
  }
  return (
    <section className='bg-white'>
      <div className='container mx-auto rounded px-4'>
        <div className={`w-full h-full min-h-48 bg-blue-100 rounded ${!banner && "animate-pulse my-2"}`}>
          <img src={banner} alt="banner image" className='w-full h-full hidden lg:block' />
          <img src={bannerMobile} alt="banner image" className='w-full h-full lg:hidden' />
        </div>
      </div>
      <div className='container mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2'>
        {loadingCategory ? (
          new Array(12).fill(null).map((c, idx) => {
            return (
              <div key={idx} className='bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse'>
                <div className='bg-blue-100 min-h-24 rounded'></div>
                <div className='bg-blue-100 h-8 rounded'></div>
              </div>
            )
          })
        ) : (
          categoryData.map((category, idx) => {
            return (
              <div key={idx} className='w-full h-full cursor-pointer hover:scale-105 transition' onClick={() => handleRedirectProductListPage(category._id, category.name)}>
                <div>
                  <img src={category.image} alt="category image" className='w-full h-full object-scale-down' />
                </div>
              </div>
            )
          })
        )

        }
      </div>
    </section>
  )
}

export default Home