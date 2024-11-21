const url = 'https://luizzoff-lp2-sistema2.vercel.app/clientes/';
// const url = 'http://localhost:5000/clientes/'  

export async function gravar(cliente) {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.REACT_APP_AUTORIZACAO
        },
        body: JSON.stringify(cliente)
    });
    return await res.json();
}

export async function deletar(cliente) {
    const res = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.REACT_APP_AUTORIZACAO
        },
        body: JSON.stringify(cliente)
    });
    return await res.json();
}

export async function atualizar(cliente) {
    const res = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.REACT_APP_AUTORIZACAO
        },
        body: JSON.stringify(cliente)
    });
    return await res.json();
}

export async function consultar() {
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': process.env.REACT_APP_AUTORIZACAO
        }
    });
    return await res.json();
}
