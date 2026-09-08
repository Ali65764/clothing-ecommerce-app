import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { Button, Card, Input, Label, PageHeader, Select, Textarea, cx } from '../components/ui'
import { ImageIcon, PlusIcon } from '../components/ui/Icons'

const SIZES = ['S', 'M', 'L', 'XL', 'XXL']

const Add = ({ token }) => {

  const [image, setImage] = useState(false)

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([])

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!image) {
        toast.error("Image is required", { autoClose: 1500 })
        return
      }

      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('category', category)
      formData.append('subCategory', subCategory)
      formData.append('bestseller', bestseller)
      formData.append('sizes', JSON.stringify(sizes))
      formData.append('image', image)

      const response = await axios.post(backendUrl + "/api/product", formData, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message, { autoClose: 1500 })
        setName('')
        setDescription('')
        setImage(false)
        setPrice('')
      } else {
        toast.error(response.data.message)
      }
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    }

  }

  return (
    <form onSubmit={onSubmitHandler}>
      <PageHeader
        eyebrow='Catalogue'
        title='Add a product'
        description='Upload the product image and fill in the details.'
        action={
          <Button type='submit' variant='primary' size='md'>
            <PlusIcon size={16} />
            Add product
          </Button>
        }
      />

      <div className='mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[1.5fr_1fr] lg:items-start'>

        <div className='flex flex-col gap-5'>
          <Card className='p-5 sm:p-6'>
            <h2 className='font-semibold text-neutral-900'>Product details</h2>

            <div className='mt-5 flex flex-col gap-4'>
              <Input
                onChange={(e) => setName(e.target.value)}
                value={name}
                name='name'
                label='Product name'
                type="text"
                placeholder='Type here'
                required
              />

              <Textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                name='description'
                label='Product description'
                placeholder='Write content'
              />
            </div>
          </Card>

          <Card className='p-5 sm:p-6'>
            <h2 className='font-semibold text-neutral-900'>Classification</h2>

            <div className='mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3'>
              <Select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                name='category'
                label='Product category'
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </Select>

              <Select
                onChange={(e) => setSubCategory(e.target.value)}
                value={subCategory}
                name='subCategory'
                label='Sub category'
              >
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
              </Select>

              <Input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                name='price'
                label='Product price'
                type="Number"
                placeholder='25'
              />
            </div>

            <div className='mt-6'>
              <Label>Product sizes</Label>
              <div className='mt-1 flex flex-wrap gap-2'>
                {SIZES.map((s) => (
                  <button
                    key={s}
                    type='button'
                    aria-pressed={sizes.includes(s)}
                    onClick={() => setSizes(prev => prev.includes(s) ? prev.filter(item => item !== s) : [...prev, s])}
                    className={cx(
                      'h-10 min-w-[3rem] rounded border px-4 text-sm',
                      sizes.includes(s)
                        ? 'border-brand-500 bg-brand-50 font-semibold text-brand-700'
                        : 'border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400'
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <label
              htmlFor='bestseller'
              className={cx(
                'mt-6 flex w-fit cursor-pointer items-center gap-2.5',
                bestseller ? 'text-neutral-900' : 'text-neutral-700'
              )}
            >
              <input
                onChange={() => setBestseller(prev => !prev)}
                checked={bestseller}
                type="checkbox"
                id='bestseller'
                className='h-4 w-4 cursor-pointer accent-brand-500'
              />
              <span className='text-sm'>Add to bestseller</span>
            </label>
          </Card>
        </div>

        <Card className='p-5 sm:p-6'>
          <h2 className='font-semibold text-neutral-900'>Product image</h2>
          <p className='mb-4 mt-1 text-sm text-neutral-500'>One image per product. Required.</p>

          <label
            htmlFor='image'
            className={cx(
              'relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded border',
              image
                ? 'border-neutral-200 bg-neutral-100'
                : 'border-dashed border-neutral-300 bg-neutral-50 hover:border-neutral-400'
            )}
          >
            {image ? (
              <img className='h-full w-full object-cover' src={URL.createObjectURL(image)} alt='Product' />
            ) : (
              <span className='flex flex-col items-center gap-2 text-neutral-500'>
                <ImageIcon size={28} />
                <span className='text-sm'>Upload image</span>
              </span>
            )}
            <input onChange={(e) => setImage(e.target.files[0])} type="file" accept='image/*' id='image' hidden />
          </label>

          {image && (
            <button
              type='button'
              onClick={() => setImage(false)}
              className='mt-3 w-full rounded border border-neutral-300 py-2 text-sm text-neutral-600 hover:bg-neutral-100'
            >
              Remove image
            </button>
          )}

          <Button type='submit' variant='primary' size='md' full className='mt-5'>
            Add product
          </Button>
        </Card>
      </div>
    </form>
  )
}

export default Add
