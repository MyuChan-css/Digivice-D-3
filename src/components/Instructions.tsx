import React from 'react';
export function Instructions() {
    return (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white border border-white/20 w-full max-w-md shadow-xl transition-all duration-500 ease-out opacity-100">
            <h2 className="text-2xl font-bold mb-4 font-['Press_Start_2P'] text-yellow-500 text-center tracking-wider drop-shadow-md">
                MANUAL DE USO
            </h2>

            <div className="space-y-6 font-mono text-sm leading-relaxed">

                {/* Section 1: Buttons */}
                <section className="bg-black/30 p-4 rounded-lg border border-white/10">
                    <h3 className="text-[#3b82f6] font-bold mb-3 flex items-center gap-2">
                        <span className="text-xl">🎮</span> CONTROLES
                    </h3>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-blue-800 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                                ⚡
                            </div>
                            <div>
                                <strong className="block text-blue-300">Botón Izquierdo</strong>
                                <span className="text-gray-300 text-xs">ENCENDER / APAGAR (Música)</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-blue-800 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                                A
                            </div>
                            <div>
                                <strong className="block text-blue-300">Botón Superior Der.</strong>
                                <span className="text-gray-300 text-xs">SELECCIONAR / CONFIRMAR</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-blue-800 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                                B
                            </div>
                            <div>
                                <strong className="block text-blue-300">Botón Inferior Der.</strong>
                                <span className="text-gray-300 text-xs">ATRAS / CANCELAR</span>
                            </div>
                        </li>
                    </ul>
                </section>

                {/* Section 2: How to Play */}
                <section className="bg-black/30 p-4 rounded-lg border border-white/10">
                    <h3 className="text-[#e6a93d] font-bold mb-3 flex items-center gap-2">
                        <span className="text-xl">⚔️</span> FUNCIONES
                    </h3>
                    <ul className="space-y-2 text-gray-200">
                        <li className="flex gap-2">
                            <span>👉</span>
                            <span>Usa los botones <span className="text-blue-400 font-bold">A</span> y <span className="text-blue-400 font-bold">B</span> para navegar por el menú.</span>
                        </li>
                        <li className="flex gap-2">
                            <span>👉</span>
                            <span>Selecciona un Digimon para ver sus estadísticas.</span>
                        </li>
                        <li className="flex gap-2">
                            <span>👉</span>
                            <span>¡Activa la <span className="text-yellow-400 font-bold">DIGIEVOLUCIÓN</span> para ver el efecto especial!</span>
                        </li>
                    </ul>
                </section>

                <div className="text-center text-xs text-white/40 mt-4 italic">
                    "El valor de un Digimon depende de su compañero."
                </div>
            </div>
        </div>
    );
}
