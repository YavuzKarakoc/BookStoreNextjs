"use client";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Formik, Form, Field } from "formik";
import { useBookStore } from "../../core/BookListProvider";
import { bookM, authorM } from "../../core/model";
import { updateBook } from "../../core/request";
import styles from "./bookform.module.css";

function UpdateBookForm() {
    const { isBookUpdateForm, setIsBookUpdateForm, authors, book, setBook } =
        useBookStore();

    const handleClose = () => {
        setIsBookUpdateForm(false);
        setBook(undefined)
    };

    const handleSubmit = async (values: bookM) => {
        console.log(values);
        values.authorId = Number(values.authorId);
        updateBook(values).then(()=>{
            setIsBookUpdateForm(false);
        })
        
    };

    return (
        <Modal
            isOpen={isBookUpdateForm}
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
                {book && (
                    <Formik
                        initialValues={{
                            id: book.id,
                            name: book.name,
                            price: book.price,
                            type: book.type,
                            language: book.language,
                            authorId: book.authorId,
                        }}
                        onSubmit={handleSubmit}
                    >
                        {({ values, setFieldValue }) => (
                            <Form>
                                <div className="d-flex flex-column justify-content-center">
                                    <div className={styles.item}>
                                        <label
                                            htmlFor="name"
                                            className={styles.label}
                                        >
                                            <b>Book Name</b>
                                        </label>
                                        <Field
                                            type="text"
                                            name="name"
                                            className={styles.field}
                                        />
                                    </div>
                                    <div className={styles.item}>
                                        <label
                                            htmlFor="price"
                                            className={styles.label}
                                        >
                                            <b>Price</b>
                                        </label>
                                        <Field
                                            type="text"
                                            name="price"
                                            className={styles.field}
                                        />
                                    </div>
                                    <div className={styles.item}>
                                        <label
                                            htmlFor="type"
                                            className={styles.label}
                                        >
                                            <b>Type</b>
                                        </label>
                                        <Field
                                            type="text"
                                            name="type"
                                            className={styles.field}
                                        />
                                    </div>
                                    <div className={styles.item}>
                                        <label
                                            htmlFor="language"
                                            className={styles.label}
                                        >
                                            <b>Language</b>
                                        </label>
                                        <Field
                                            type="text"
                                            name="language"
                                            className={styles.field}
                                        />
                                    </div>
                                    <div className={styles.item}>
                                        <label
                                            htmlFor="authorId"
                                            className={`${styles.label} `}
                                        >
                                            <b>Author</b>
                                        </label>
                                        <Field
                                            as="select"
                                            name="authorId"
                                            className={styles.formselect}
                                        >
                                            {/* authors'ları dön ve seçenekleri oluştur */}
                                            {authors.map(
                                                (
                                                    author: authorM,
                                                    index: any
                                                ) => (
                                                    <option
                                                        key={index}
                                                        value={author.id}
                                                    >
                                                        {author.name}
                                                    </option>
                                                )
                                            )}
                                        </Field>
                                    </div>
                                    <div className="w-100 d-flex justify-content-center">
                                        <button
                                            type="button"
                                            onClick={() => handleSubmit(values)}
                                            className="btn btn-primary"
                                        >
                                            {" "}
                                            Gönder
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                )}
            </div>
        </Modal>
    );
}

export default UpdateBookForm;
