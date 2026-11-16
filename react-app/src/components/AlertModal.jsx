function AlertModal({message, onClose}){
    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="relative rounded-lg bg-white p-6">
                <button className="absolute top-2 right-3" type="button" onClick={onClose}>×</button>
                <div className="flex items-center gap-4 mt-4">
                    <p>⚠️</p>
                    <p>{message}</p>
                </div>
            </div>
        </div>
    )
}

export default AlertModal