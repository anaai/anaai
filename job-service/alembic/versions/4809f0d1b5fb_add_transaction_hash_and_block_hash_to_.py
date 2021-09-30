"""Add transaction_hash and block_hash to job_request

Revision ID: 4809f0d1b5fb
Revises: ae203134339e
Create Date: 2021-09-10 13:22:59.907161

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4809f0d1b5fb'
down_revision = 'ae203134339e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('job_request', sa.Column('transaction_hash', sa.String(length=155), nullable=False))
    op.add_column('job_request', sa.Column('block_hash', sa.String(length=155), nullable=False))
    op.create_unique_constraint(None, 'job_request', ['block_hash'])
    op.create_unique_constraint(None, 'job_request', ['transaction_hash'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'job_request', type_='unique')
    op.drop_constraint(None, 'job_request', type_='unique')
    op.drop_column('job_request', 'block_hash')
    op.drop_column('job_request', 'transaction_hash')
    # ### end Alembic commands ###