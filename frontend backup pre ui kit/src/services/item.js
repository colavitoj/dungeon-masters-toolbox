import http from '../http-common';
import React from 'react';

class ItemDataService extends React.Component {
    getAll(page = 0) {
        return http.get(`?page=${page}`);
    }

    get(id) {
        return http.get(`?id=${id}`);
    }

    find(query, by = "name", page = 0) {
        return http.get(`?${by}=${query}&page=${page}`);
    }

    createItem(data) {
        return http.post("/items", data);
    }

    updateItem(data) {
        return http.put("/items", data);
    }

    deleteItem(id, userId) {
        return http.delete(`/items?id=${id}`, { data: { user_id: userId } });
    }

    getItemslot(id) {
        return http.get(`/itemslots`);
    }

}

export default new ItemDataService()