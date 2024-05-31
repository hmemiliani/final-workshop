export function TraskScene(){
    const pageContent = `<div>Hola Mundo!</div>`;
    const logic = () => {
        console.log("Hola mundo desde la consola");
    }

    return{
        pageContent,
        logic
    }
}