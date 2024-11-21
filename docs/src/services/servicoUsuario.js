const url = 'https://luizzoff-lp2-sistema2.vercel.app/usuarios/';
// const url = 'http://localhost:5000/usuarios/'  

export async function gravar(usuario) {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.REACT_APP_AUTORIZACAO
        },
        body: JSON.stringify(usuario)
    });
    return await res.json();
}

export async function deletar(usuario) {
    const res = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.REACT_APP_AUTORIZACAO
        },
        body: JSON.stringify(usuario)
    });
    return await res.json();
}

export async function atualizar(usuario) {
    const res = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.REACT_APP_AUTORIZACAO
        },
        body: JSON.stringify(usuario)
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

export async function login(nomeU, senhaU) {
    const res = await fetch(url + "login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.REACT_APP_AUTORIZACAO
        },
        body: JSON.stringify({
            nome: nomeU,
            senha: senhaU
        })
    });
    return await res.json();
}
