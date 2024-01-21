"use client";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Formik, Form, Field } from "formik";
import { useBookStore } from "../../core/BookListProvider";
import { bookM, authorM } from "../../core/model";
import { createBook } from "../../core/request";
import styles from "./bookform.module.css";

function AddBookForm() {
    const { isBookAddForm, setIsBookAddForm, authors } = useBookStore();

    const handleClose = () => {
        setIsBookAddForm(false);
    };
    const handleSubmit = async (values: bookM) => {
        console.log(values);
        values.authorId = Number(values.authorId);
        console.log(typeof(values.authorId));
        createBook(values).then(() => {
            setIsBookAddForm(false);
        });
    };

    return (
        <Modal
            isOpen={isBookAddForm}
            onRequestClose={handleClose}
            style={{
                content: {
                    width: "40%",
                    margin: "auto",
                    maxHeight: "320px",
                    
                },
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 999999,
                },
            }}
        >
            <div>
                <Formik
                    initialValues={{
                        id: undefined,
                        name: "",
                        price: "",
                        type: "",
                        language: "",
                        authorId: undefined,
                    }}
                    onSubmit={handleSubmit}
                >
                    {({ values, setFieldValue }) => (
                        <Form>
                            <div className="d-flex flex-column justify-content-center">
                                <div  className={styles.item}>
                                    <label htmlFor="name" className={styles.label}>
                                        <b>Book Name</b>
                                    </label>
                                    <Field type="text" name="name" className={styles.field} />
                                </div>
                                <div  className={styles.item}>
                                    <label htmlFor="price" className={styles.label}>
                                        <b>Price</b>
                                    </label>
                                    <Field type="text" name="price" className={styles.field} />
                                </div>
                                <div  className={styles.item}>
                                    <label htmlFor="type" className={styles.label}>
                                        <b>Type</b>
                                    </label>
                                    <Field type="text" name="type" className={styles.field} />
                                </div>
                                <div  className={styles.item}>
                                    <label htmlFor="language" className={styles.label}>
                                        <b>Language</b>
                                    </label>
                                    <Field type="text" name="language" className={styles.field} />
                                </div>
                                <div className={styles.item}>
                                    <label htmlFor="authorId" className={`${styles.label}   `}>
                                        <b>Author</b>
                                    </label>
                                    <Field as="select" name="authorId" className={styles.formselect}>

                                        {/* authors'ları dön ve seçenekleri oluştur */}
                                        {authors.map((author:authorM, index:any) => (
                                            <option key={index} value={author.id}>
                                                {author.name}
                                            </option>
                                        ))}
                                    </Field>
                                </div>
                                <div className="w-100 d-flex justify-content-center">
                                    <button
                                        onClick={() => handleSubmit}
                                        className="btn btn-primary"
                                    >
                                        {" "}
                                        gönder
                                    </button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </Modal>
    );
}

export default AddBookForm;
