import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { ButtonOutline, ButtonSolid } from '../components/Button';
import useContactFormStore from '../stores/useContactFormStore';

const notify = (text) => toast.success(text);

const Contact = () => {
  const formState = useContactFormStore((state) => state.formState);
  const setFormState = useContactFormStore((state) => state.setFormState);
  const resetForm = useContactFormStore((state) => state.resetForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('formState', JSON.stringify(formState));
    notify('Changes saved successfully.');
  };

  useEffect(() => {
    const storedFormState = JSON.parse(localStorage.getItem('formState'));
    if (storedFormState) {
      setFormState(storedFormState);
    }
  }, [setFormState]);

  return (
    <div className='container mx-auto max-w-3xl px-5 py-8'>
      <Toaster position='bottom-right' />
      <h1 className='text-3xl font-medium font-display text-center'>
        Contact Us
      </h1>

      <form
        className='mt-10 mx-auto flex flex-col gap-6'
        onSubmit={handleSubmit}
      >
        <div className='flex flex-col sm:flex-row gap-6'>
          <div className='w-full'>
            <label
              htmlFor='firstName'
              className='block text-sm font-medium text-slate-700'
            >
              First Name
            </label>
            <div className='mt-1'>
              <input
                type='text'
                name='firstName'
                id='firstName'
                value={formState.firstName || ''}
                onChange={handleChange}
                className='shadow-sm focus:ring-violet-500 focus:border-violet-500 block w-full text-sm border-slate-300 rounded-md'
                placeholder='Steve'
                required
                minLength={2}
                maxLength={60}
              />
            </div>
          </div>

          <div className='w-full'>
            <label
              htmlFor='lastName'
              className='block text-sm font-medium text-slate-700'
            >
              Last Name
            </label>
            <div className='mt-1'>
              <input
                type='text'
                name='lastName'
                id='lastName'
                value={formState.lastName || ''}
                onChange={handleChange}
                className='shadow-sm focus:ring-violet-500 focus:border-violet-500 block w-full text-sm border-slate-300 rounded-md'
                placeholder='Gates'
                required
                minLength={2}
                maxLength={60}
              />
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-slate-700'
          >
            Email
          </label>
          <div className='mt-1'>
            <input
              type='email'
              name='email'
              id='email'
              value={formState.email || ''}
              onChange={handleChange}
              className='shadow-sm focus:ring-violet-500 focus:border-violet-500 block w-full text-sm border-slate-300 rounded-md'
              placeholder='stevegates@tesla.com'
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor='comments'
            className='block text-sm font-medium text-slate-700'
          >
            Comments
          </label>
          <div className='mt-1'>
            <textarea
              name='comments'
              id='comments'
              onChange={handleChange}
              value={formState.comments || ''}
              className='shadow-sm focus:ring-violet-500 focus:border-violet-500 block w-full text-sm border-slate-300 rounded-md resize-none'
              rows={5}
              placeholder='The quick brown fox jumps over the lazy dog.'
            />
          </div>
        </div>

        <div className='mt-6 flex gap-8 justify-end'>
          <ButtonOutline onClickHandler={resetForm}>Reset Form</ButtonOutline>
          <ButtonSolid type='submit'>Save changes</ButtonSolid>
        </div>
      </form>
    </div>
  );
};

export default Contact;
