// src/components/UseAsyncTest.jsx
import useAsync from '../hooks/useAsync';

const simpleAsync = async () => {
    console.log('simpleAsync called');
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { message: 'Success!' };
};

function UseAsyncTest() {
    const { data, isPending, isSuccess, isError, error } = useAsync(simpleAsync, true);

    console.log('Render state:', { isPending, isSuccess, isError, data });

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Simple useAsync Test</h1>

            {isPending && <p>⏳ Loading...</p>}
            {isError && <p style={{ color: 'red' }}>❌ Error: {error?.message}</p>}
            {isSuccess && <p style={{ color: 'green' }}>✅ Data: {JSON.stringify(data)}</p>}
        </div>
    );
}

export default UseAsyncTest;