// ./gatsby-node.js
exports.onCreateNode = async ({ node, actions: { createNode }, createNodeId, getCache }) => {
	if (node.internal.type === "MarkdownRemark") {
		for (let i = 0; i < node.frontmatter["Hero Image"].length; i++) {
			const name = node.frontmatter["Hero Image"][i].name

			if (!name) {
				continue
			}

			if (name.startsWith("http")) {
				const fileNode = await createRemoteFileNode({
					url: name,
					parentNodeId: node.id,
					createNode,
					createNodeId,
					getCache,
				})

				if (fileNode) {
					node.frontmatter["Hero Image"][i].remoteImage___NODE = fileNode.id
				}
			}
		}
	}
}