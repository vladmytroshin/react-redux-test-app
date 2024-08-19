import React, {ChangeEvent, useState} from 'react';
import { RootState, AppDispatch, setSelectedOption, setDiscountCode, setNotes } from './app/store';
import {useAppDispatch, useAppSelector} from "./app/hooks";

const App = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const { selectedOption, discountCode, notes } = useAppSelector((state: RootState) => state.app);

    // Local state
    const [discount, setDiscount] = useState("");
    const [localNote, setLocalNote] = useState("");
    const [error, setError] = useState("");

    const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSelectedOption(e.target.value));
    };

    const handleDiscountChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setError("");
        setDiscount(e.target.value);
    }

    const handleDiscountCodeSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = /^DISCOUNT2024$/.test(discount);
        if (isValid || discount === '') { // validate the input or ignore empty inputs
            dispatch(setDiscountCode(discount));
        } else {
            dispatch(setDiscountCode(""));
            setError("Wrong discount code!")
        }
        setDiscount("")
    };

    const generateDiscountCode = () => {
        setError("");
        dispatch(setDiscountCode(""));
        alert('Your new discount code is: NEWCODE123');
    };

    const handleNotesChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setLocalNote(e.target.value);
    };
    const handleNotesSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (localNote === "") return; // ignore empty inputs
        dispatch(setNotes(localNote));
        setLocalNote("");
    };

    return (
        <div className="p-4 max-w-md mx-auto mt-8 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Mini Application</h1>

            <div className="mb-4">
                <p className="font-semibold">Select an Option:</p>
                <div>
                    <label className="flex items-center gap-2 mr-4 cursor-pointer">
                        <input
                            type="radio"
                            name="option"
                            value="Option A"
                            checked={selectedOption === 'Option A'}
                            onChange={handleOptionChange}
                        />
                        Option A
                    </label>
                    <label className="flex items-center gap-2 mr-4 cursor-pointer">
                        <input
                            type="radio"
                            name="option"
                            value="Option B"
                            checked={selectedOption === 'Option B'}
                            onChange={handleOptionChange}
                        />
                        Option B
                    </label>
                    <label className="flex items-center gap-2 mr-4 cursor-pointer">
                        <input
                            type="radio"
                            name="option"
                            value="Option C"
                            checked={selectedOption === 'Option C'}
                            onChange={handleOptionChange}
                        />
                        Option C
                    </label>
                </div>
            </div>

            <div className="mb-4">
                <p className="text-md font-semibold">Enter Discount Code:</p>
                <span className="text-xs flex mb-4">* Enter the code "DISCOUNT2024" to get a discount</span>
                <form onSubmit={handleDiscountCodeSubmit} className="flex items-center gap-4">
                    <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-md"
                        value={discount}
                        onChange={handleDiscountChange}
                        placeholder="Enter discount code"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Submit
                    </button>
                </form>
                { error ? <div className="text-red-600 mt-2">{error}</div> : ""}
                { discountCode ? <div className="mt-2">Your discount code is: <span className="text-blue-500">{discountCode}</span></div> : ""}

            </div>

            <div className="mb-4">
                <p className="font-semibold block mb-2">Enter Discount Code:</p>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={generateDiscountCode}
                >
                    Generate
                </button>
            </div>

            <div>
                <p className="font-semibold mb-2">Notes:</p>
                <form onSubmit={handleNotesSubmit} className="flex items-center gap-4">
                    <textarea
                        className="w-full px-3 py-2 border rounded-md"
                        value={localNote}
                        onChange={handleNotesChange}
                        placeholder="Enter your notes here..."
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Submit
                    </button>
                </form>
                {
                    notes.length > 0
                        ? <div className="mt-2 p-2 border border-gray-300 rounded-md max-h-[200px] overflow-auto">
                            <p className="text-md font-semibold mb-2">Resent notes:</p>
                            <ul className="flex flex-col-reverse">{notes.map((note, i) =>
                                <li key={`item_${i}_${Date.now()}`}>{note}</li>
                            )}</ul>
                        </div>
                        : ""
                }
            </div>
        </div>
    );
};

export default App;