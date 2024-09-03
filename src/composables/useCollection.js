import { ref } from "vue";


const useCollection = (collection) => {
    const error = ref(null);
    const isPending = ref(false);

    const addDoc = {};
    return { error, addDoc, isPending };
}

export default useCollection;
