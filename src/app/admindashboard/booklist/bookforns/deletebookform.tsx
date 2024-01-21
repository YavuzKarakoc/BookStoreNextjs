"use client";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Formik, Form, Field } from "formik";
import { useBookStore } from "../../core/BookListProvider";
import { bookM } from "../../core/model";
import { deleteBook } from "../../core/request";
import styles from "./bookform.module.css";

function DeleteBookForm() {
    const { isBookDeleteForm, setIsBookDeleteForm, authors, book } =
        useBookStore();

    const handleClose = () => {
        setIsBookDeleteForm(false);
    };
    const handleSubmit = async (id:any) => {
        deleteBook(id).then(() => {
            setIsBookDeleteForm(false);
        });
    };

    return (
        <Modal
            isOpen={isBookDeleteForm}
            onRequestClose={handleClose}
            style={{
                content: {
                    width: "40%",
                    margin: "auto",
                    maxHeight: "140px",
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
                        name: "",
                    }}
                    onSubmit={handleSubmit}
                >
                    {({ values, setFieldValue }) => (
                        <Form>
                            <div className="d-flex flex-column justify-content-center">
                                <div className={styles.item}>
                                    <h3>
                                        {book?.name} isimli kitap silinsin mi ?
                                    </h3>
                                </div>
                                <div className="w-100 d-flex justify-content-center">
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleClose}
                                    >
                                        Vazgeç
                                    </button>
                                    <button
                                        onClick={() => handleSubmit(book?.id)}
                                        className="btn btn-danger"
                                    >
                                        Sil
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

export default DeleteBookForm;
