import React from 'react';

const Modal = (props) => {
    const { title, body, onClose, onAction, hiddenFooter } = props;

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden outline-none focus:outline-none">
                <div className="relative w-auto max-w-3xl mx-auto my-6 ">
                    {/*content*/}
                    <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-3 border-b border-solid rounded-t border-slate-200">
                            <h3 className="text-3xl font-semibold">{title}</h3>
                            <button
                                className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none"
                                onClick={onClose}
                            >
                                <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative flex-auto p-5">{body}</div>
                        {/*footer*/}
                        {!hiddenFooter && (
                            <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
                                <button
                                    className="px-6 py-2 mb-1 mr-1 text-sm text-red-500 transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                                    type="button"
                                    onClick={onClose}
                                >
                                    Close
                                </button>
                                <button
                                    className="px-6 py-3 mb-1 mr-1 text-sm text-black transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                                    type="button"
                                    onClick={onAction}
                                >
                                    Confirm
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
    );
};

export default Modal;
