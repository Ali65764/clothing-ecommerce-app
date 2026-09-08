import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import axios from 'axios'
import {
  Badge, Button, Card, EmptyState, Input, Label, Modal, PageHeader, Select,
  Skeleton, StatCard, Textarea, controlClass, cx,
} from '../components/ui'
import { EditIcon, ImageIcon, SearchIcon, SparkIcon, TrashIcon, WalletIcon } from '../components/ui/Icons'

const SIZES = ['S', 'M', 'L', 'XL', 'XXL']

const List = ({ token }) => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [pendingDelete, setPendingDelete] = useState(null)

  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(null)
  const [newImage, setNewImage] = useState(false)
  const [saving, setSaving] = useState(false)

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product')
      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message, { autoClose: 1500 })
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(backendUrl + '/api/product/' + id, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message, { autoClose: 1500 })
        await fetchList();
      } else {
        toast.error(response.data.message)
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  const confirmDelete = async () => {
    const target = pendingDelete
    setPendingDelete(null)
    if (target) await removeProduct(target._id)
  }

  const openEdit = (item) => {
    setEditing(item)
    setNewImage(false)
    setForm({
      name: item.name ?? '',
      description: item.description ?? '',
      price: item.price ?? '',
      category: item.category ?? 'Men',
      subCategory: item.subCategory ?? 'Topwear',
      sizes: Array.isArray(item.sizes) ? item.sizes : [],
      bestseller: Boolean(item.bestseller),
    })
  }

  const closeEdit = () => {
    setEditing(null)
    setForm(null)
    setNewImage(false)
  }

  const onFormChange = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  const toggleSize = (s) =>
    setForm(prev => ({
      ...prev,
      sizes: prev.sizes.includes(s) ? prev.sizes.filter(item => item !== s) : [...prev.sizes, s],
    }))

  const submitEdit = async (e) => {
    e.preventDefault()
    if (!editing) return

    try {
      setSaving(true)

      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('description', form.description)
      formData.append('price', form.price)
      formData.append('category', form.category)
      formData.append('subCategory', form.subCategory)
      formData.append('bestseller', form.bestseller)
      formData.append('sizes', JSON.stringify(form.sizes))

      if (newImage) formData.append('image', newImage)

      const response = await axios.put(
        backendUrl + '/api/product/' + editing._id,
        formData,
        { headers: { token } }
      )

      if (response.data.success) {
        toast.success(response.data.message, { autoClose: 1500 })
        closeEdit()
        await fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    } finally {
      setSaving(false)
    }
  }

  const visible = query
    ? list.filter((item) => item.name?.toLowerCase().includes(query.toLowerCase()))
    : list

  const bestsellerCount = list.filter((item) => item.bestseller).length

  return (
    <>
      <PageHeader
        eyebrow='Catalogue'
        title='All products'
        description='Every product currently published to the storefront.'
      />

      <div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3'>
        <StatCard label='Total products' value={loading ? '—' : list.length} icon={<ImageIcon size={18} />} />
        <StatCard label='Bestsellers' value={loading ? '—' : bestsellerCount} icon={<SparkIcon size={18} />} />
        <StatCard label='Showing' value={loading ? '—' : visible.length} icon={<WalletIcon size={18} />} />
      </div>

      <div className='mt-6'>
        <div className='relative w-full sm:max-w-sm'>
          <SearchIcon size={17} className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400' />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type='text'
            placeholder='Filter by name'
            aria-label='Filter products by name'
            className={cx(controlClass, 'h-10 pl-9')}
          />
        </div>
      </div>

      <Card className='mt-4 overflow-hidden'>
        <div className='hidden grid-cols-[64px_3fr_1fr_1fr_96px] items-center gap-4 border-b border-neutral-200 bg-neutral-50 px-4 py-2.5 md:grid'>
          {['Image', 'Name', 'Category', 'Price', 'Actions'].map((h, i) => (
            <span
              key={h}
              className={cx('text-xs font-semibold text-neutral-500', i === 4 && 'text-right')}
            >
              {h}
            </span>
          ))}
        </div>

        {loading ? (
          <div className='flex flex-col divide-y divide-neutral-200'>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className='flex items-center gap-4 px-4 py-3'>
                <Skeleton className='h-14 w-14 shrink-0' />
                <Skeleton className='h-3 w-1/3' />
                <Skeleton className='ml-auto h-3 w-16' />
              </div>
            ))}
          </div>
        ) : visible.length === 0 ? (
          <EmptyState
            icon={<ImageIcon size={22} />}
            title={list.length === 0 ? 'No products yet' : 'No matching products'}
            description={
              list.length === 0
                ? 'Products you add will be listed here.'
                : 'Nothing matches that name. Try a different search.'
            }
            action={
              query
                ? <Button onClick={() => setQuery('')} variant='outline' size='sm'>Clear filter</Button>
                : null
            }
          />
        ) : (
          <div className='flex flex-col divide-y divide-neutral-200'>
            {visible.map((item, index) => (
              <div
                key={index}
                className='grid grid-cols-[56px_1fr_auto] items-center gap-4 px-4 py-3 hover:bg-neutral-50 md:grid-cols-[64px_3fr_1fr_1fr_96px]'
              >
                <div className='aspect-square w-14 overflow-hidden rounded border border-neutral-200'>
                  <img className='h-full w-full object-cover' src={item.image} alt={item.name} />
                </div>

                <div className='min-w-0'>
                  <p className='truncate text-sm text-neutral-900'>{item.name}</p>
                  <div className='mt-1.5 flex flex-wrap items-center gap-2 md:hidden'>
                    <span className='text-xs text-neutral-500'>{item.category}</span>
                    <span className='text-xs font-semibold text-neutral-900'>{currency}{item.price}</span>
                    {item.bestseller && <Badge variant='softVolt'>Bestseller</Badge>}
                  </div>
                  {item.bestseller && (
                    <span className='mt-2 hidden md:inline-flex'>
                      <Badge variant='softVolt'>Bestseller</Badge>
                    </span>
                  )}
                </div>

                <p className='hidden text-sm text-neutral-600 md:block'>{item.category}</p>
                <p className='hidden text-sm font-semibold tabular-nums text-neutral-900 md:block'>
                  {currency}{item.price}
                </p>

                <div className='flex justify-end gap-1'>
                  <button
                    type='button'
                    onClick={() => openEdit(item)}
                    aria-label={`Edit ${item.name}`}
                    className='flex h-8 w-8 items-center justify-center rounded text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900'
                  >
                    <EditIcon size={17} />
                  </button>
                  <button
                    type='button'
                    onClick={() => setPendingDelete(item)}
                    aria-label={`Delete ${item.name}`}
                    className='flex h-8 w-8 items-center justify-center rounded text-neutral-500 hover:bg-red-50 hover:text-red-700'
                  >
                    <TrashIcon size={17} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

  
      <Modal
        open={Boolean(editing)}
        onClose={closeEdit}
        title='Edit product'
        description='Update the details below. The image only changes if you pick a new one.'
        className='max-w-2xl'
        footer={
          <>
            <Button onClick={closeEdit} variant='outline' size='sm' type='button'>Cancel</Button>
            <Button onClick={submitEdit} variant='primary' size='sm' type='button' disabled={saving}>
              {saving ? 'Saving...' : 'Save changes'}
            </Button>
          </>
        }
      >
        {editing && form && (
          <form onSubmit={submitEdit} className='flex flex-col gap-5'>
            <div className='flex flex-col gap-5 sm:flex-row'>
              <div className='sm:w-40 sm:shrink-0'>
                <Label htmlFor='edit-image'>Image</Label>
                <label
                  htmlFor='edit-image'
                  className='group relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded border border-neutral-200 bg-neutral-100 hover:border-neutral-400'
                >
                  <img
                    className='h-full w-full object-cover'
                    src={newImage ? URL.createObjectURL(newImage) : editing.image}
                    alt={form.name}
                  />
                  <span className='absolute inset-0 flex items-center justify-center bg-neutral-900/50 text-sm text-white opacity-0 group-hover:opacity-100'>
                    Replace
                  </span>
                  <input
                    onChange={(e) => setNewImage(e.target.files[0])}
                    type='file'
                    accept='image/*'
                    id='edit-image'
                    hidden
                  />
                </label>
                {newImage && (
                  <button
                    type='button'
                    onClick={() => setNewImage(false)}
                    className='mt-2 w-full rounded border border-neutral-300 py-1.5 text-xs text-neutral-600 hover:bg-neutral-100'
                  >
                    Keep original
                  </button>
                )}
              </div>

              <div className='flex flex-1 flex-col gap-4'>
                <Input
                  label='Product name'
                  name='edit-name'
                  type='text'
                  value={form.name}
                  onChange={(e) => onFormChange('name', e.target.value)}
                  required
                />
                <Textarea
                  label='Product description'
                  name='edit-description'
                  value={form.description}
                  onChange={(e) => onFormChange('description', e.target.value)}
                  className='min-h-[90px]'
                />
              </div>
            </div>

            <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
              <Select
                label='Category'
                name='edit-category'
                value={form.category}
                onChange={(e) => onFormChange('category', e.target.value)}
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </Select>

              <Select
                label='Sub category'
                name='edit-subCategory'
                value={form.subCategory}
                onChange={(e) => onFormChange('subCategory', e.target.value)}
              >
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
              </Select>

              <Input
                label='Price'
                name='edit-price'
                type='Number'
                value={form.price}
                onChange={(e) => onFormChange('price', e.target.value)}
              />
            </div>

            <div>
              <Label>Sizes</Label>
              <div className='flex flex-wrap gap-2'>
                {SIZES.map((s) => (
                  <button
                    key={s}
                    type='button'
                    aria-pressed={form.sizes.includes(s)}
                    onClick={() => toggleSize(s)}
                    className={cx(
                      'h-9 min-w-[2.75rem] rounded border px-3 text-sm',
                      form.sizes.includes(s)
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
              htmlFor='edit-bestseller'
              className={cx(
                'flex w-fit cursor-pointer items-center gap-2.5',
                form.bestseller ? 'text-neutral-900' : 'text-neutral-700'
              )}
            >
              <input
                type='checkbox'
                id='edit-bestseller'
                checked={form.bestseller}
                onChange={() => onFormChange('bestseller', !form.bestseller)}
                className='h-4 w-4 cursor-pointer accent-brand-500'
              />
              <span className='text-sm'>Bestseller</span>
            </label>

          
            <button type='submit' className='hidden' aria-hidden='true' tabIndex={-1} />
          </form>
        )}
      </Modal>

  
      <Modal
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        title='Delete this product?'
        description='This removes the product from the storefront. The action cannot be undone.'
        footer={
          <>
            <Button onClick={() => setPendingDelete(null)} variant='outline' size='sm'>Cancel</Button>
            <Button onClick={confirmDelete} variant='danger' size='sm'>Delete product</Button>
          </>
        }
      >
        {pendingDelete && (
          <div className='flex items-center gap-4'>
            <div className='aspect-square w-14 shrink-0 overflow-hidden rounded border border-neutral-200'>
              <img className='h-full w-full object-cover' src={pendingDelete.image} alt={pendingDelete.name} />
            </div>
            <div className='min-w-0'>
              <p className='truncate text-sm text-neutral-900'>{pendingDelete.name}</p>
              <p className='mt-1 text-sm font-semibold text-neutral-900'>{currency}{pendingDelete.price}</p>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}

export default List
