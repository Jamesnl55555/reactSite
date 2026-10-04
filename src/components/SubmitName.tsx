import { useState } from 'react';
import api from '../api/axios.ts';

type SubmitNameProps = {
    onUserAdded: () => void;
};

export default function SubmitName({ onUserAdded }: SubmitNameProps) {
    const [name, setName] = useState("");

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await api.post("/user-entry", { name });
            setName("");
            await onUserAdded();
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    return (
        <div className="App">
            <form onSubmit={submit}>
                <input
                    type="text"
                    value={name}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}