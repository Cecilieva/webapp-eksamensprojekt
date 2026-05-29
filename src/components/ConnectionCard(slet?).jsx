import React from 'react'
import './ConnectionCard.css'

function ConnectionCard({ id, name, picture, score, onMessage, onRemove }) {
	return (
		<article className="connection-card" role="listitem">
			<div className="connection-left">
				<img
					className="connection-picture"
					src={picture}
					alt={name + ' picture'}
					loading="lazy"
				/>

				<div className="connection-meta">
					<h3 className="connection-name">{name}</h3>

					<div className="connection-actions">
						<button
							type="button"
							className="btn btn-message"
							onClick={() => onMessage && onMessage(id)}
							aria-label={`Send besked til ${name}`}>
							Send besked
						</button>

						<button
							type="button"
							className="btn btn-remove"
							onClick={() => onRemove && onRemove(id)}
							aria-label={`Fjern ${name}`}>
							Fjern
						</button>
					</div>
				</div>
			</div>

			<div className="connection-score">{typeof score === 'number' ? score : ''}%</div>
		</article>
	)
}

export default ConnectionCard

