import React from 'react';

const AddSubCategoryModal = ({ close }) => {
    return (
        <section className='fixed top-0 left-0 right-0 bottom-0 bg-neutral-700/60 z-50'>
            sub category
            <button onClick={close}>close</button>
        </section>
    );
};

export default AddSubCategoryModal;