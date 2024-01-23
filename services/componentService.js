"use strict";
const loggerService = require("./loggerService");
const app = require("../firebaseApp");
// const config = require("../config");
const Component = require("../models/component");
// const { getFirestore, collection } = ("firebase/firestore");
const { getFirestore, collection, getDoc, doc } = require("firebase/firestore");
const db = getFirestore();

const get = async (id, page = undefined) => {
    // console.log(`Component Service.get - Id: ${id}`);
    try {
        // const docRef = doc(db, 'components', id);
        const docRef = doc(db, "components", id);
        const docSnap  = await getDoc(docRef);
        if (!docSnap.exists()) {
            return new Component(id)
        } else {
            const component = new Component(id);
            // console.log(`Else bit Id: ${id}`);
            const data = docSnap.data();
            // console.log(`${JSON.stringify(docSnap.data())}`);
            for (const field in data) {
                if (field !== 'items') {
                    component.add(field, data[field])
                } else {
                    if (data?.items?.length) {
                        data?.items.forEach((item) => {
                            component.addItem(item);
                        })
                    }
                }
            }
            if (page && page !== undefined) {
                component.items = pageItems(component.items, page);
            }
            // console.log(`COMPONENT: ${JSON.stringify(component)}`);
            return component;
        }

    } catch (error) {
        loggerService.logError(error);
        return {}
    }
}
const pageItems = (data, page) => {
    return data.filter((value) => {
        return value.page === page
    })
}
module.exports = {
    get
}