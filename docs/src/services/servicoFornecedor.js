const url = 'https://luizzoff-lp2-sistema2.vercel.app/fornecedores/';
// const url = 'http://localhost:5000/fornecedores/'  

export async function gravar(fornecedor) {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.REACT_APP_AUTORIZACAO
        },
        body: JSON.stringify(fornecedor)
    });
    return await res.json();
}

export async function deletar(fornecedor) {
    const res = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.REACT_APP_AUTORIZACAO
        },
        body: JSON.stringify(fornecedor)
    });
    return await res.json();
}

export async function atualizar(fornecedor) {
    const res = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.REACT_APP_AUTORIZACAO
        },
        body: JSON.stringify(fornecedor)
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
