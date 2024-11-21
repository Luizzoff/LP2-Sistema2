const url = 'https://luizzoff-lp2-sistema2.vercel.app/categorias/';
// const url = 'http://localhost:5000/categorias/'  

export async function gravar(categoria) {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.REACT_APP_AUTORIZACAO
        },
        body: JSON.stringify(categoria)
    });
    return await res.json();
}

export async function deletar(categoria) {
    const res = await fetch(url + categoria.codigo, {
        method: 'DELETE',
        headers: {
            'Authorization': process.env.REACT_APP_AUTORIZACAO
        }
    });
    return await res.json();
}

export async function atualizar(categoria) {
    const res = await fetch(url + categoria.codigo, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.REACT_APP_AUTORIZACAO
        },
        body: JSON.stringify(categoria)
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
