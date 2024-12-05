const url = 'https://luizzoff-lp2-sistema2.vercel.app/produtos/';
// const url = 'http://localhost:5000/produtos/'  

export async function gravar(produto) {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.REACT_APP_AUTORIZACAO
        },
        body: JSON.stringify(produto)
    });
    return await res.json();
}

export async function deletar(produto) {
    const res = await fetch(url + produto.codigo, {
        method: 'DELETE',
        headers: {
            'Authorization': process.env.REACT_APP_AUTORIZACAO
        }
    });
    return await res.json();
}

export async function atualizar(produto) {
    const res = await fetch(url + produto.codigo, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.REACT_APP_AUTORIZACAO
        },
        body: JSON.stringify(produto)
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
