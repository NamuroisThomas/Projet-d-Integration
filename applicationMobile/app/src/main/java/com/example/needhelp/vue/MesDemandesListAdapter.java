package com.example.needhelp.vue;

import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.example.needhelp.R;
import com.example.needhelp.controleur.Controle;
import com.example.needhelp.modele.AccesDistant;
import com.example.needhelp.modele.Demande;

import java.util.ArrayList;

public class MesDemandesListAdapter extends BaseAdapter {


    private ArrayList<Demande> mesDemandes;
    private LayoutInflater inflater;
    private Controle controle;
    private Demande demande;
    private AccesDistant accesDistant = new AccesDistant();

    public MesDemandesListAdapter(Context context, ArrayList<Demande> lesDemandes){
        this.mesDemandes = lesDemandes;
        this.inflater = LayoutInflater.from(context);
        this.controle = Controle.getInstance(null);
    }

    @Override
    public int getCount() {
        return mesDemandes.size();
    }

    /**
     * retourne l'item de la ligne actuelle
     * @param position
     * @return
     */
    @Override
    public Object getItem(int position) {
        return mesDemandes.get(position);
    }

    /**
     * retourne un indice par rapport à la ligne actuelle
     * @param position
     * @return
     */
    @Override
    public long getItemId(int position) {
        return position;
    }

    /**
     * retourne la ligne formaté avec gestion des évênement
     * @param position
     * @param view
     * @param viewGroup
     * @return
     */
    @Override
    public View getView(int position, View view, ViewGroup viewGroup) {
        // declaration d'un Holder
        MesDemandesListAdapter.ViewHolder holder;
        // si la ligne n'existe pas encore
        if(view==null){
            holder = new MesDemandesListAdapter.ViewHolder();
            // la ligne est construite avec un formatage (inflater) relié à layout_liste_demande
            view = inflater.inflate(R.layout.layout_liste_mes_demandes, null);
            // chanqe propriété du holder est relié à une propriété classique
            holder.txtDate = (TextView)view.findViewById(R.id.txtDate);
            holder.txtTitreDemande = (TextView)view.findViewById(R.id.txtTitreDemande);
            //Log.d("txtTitreDemande","************" + holder.txtTitreDemande);
            holder.txtAcceptePar = (TextView) view.findViewById(R.id.txtAcceptePar);
            Log.d("acceptePar","************" + holder.txtAcceptePar.getText());

            // affecter le holder à la vue
            view.setTag(holder);
        }else{
            // recupération du  holder dans le ligne existante
            holder = (MesDemandesListAdapter.ViewHolder)view.getTag();
        }
        //valorisation du contenu du holder donc de la ligne
        holder.txtTitreDemande.setText(mesDemandes.get(position).getTitreDemande().toString());
        holder.txtDate.setText(mesDemandes.get(position).getDateDemande());
        Log.d("txtTitreDemande","************" + holder.txtTitreDemande.getText());
        holder.txtAcceptePar.setText("     ID: "+mesDemandes.get(position).getAcceptePar());
        //Log.d("acceptePar","************" + holder.txtAcceptePar);

        /*
        //Clique sur le bouton pour accepter la demande
        holder.txtAcceptePar.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                int ligne = (int) v.getTag();
                MesDemandes.get(ligne).setAccepteDemande(1);
                MesDemandes.get(ligne).setAcceptePar(controle.getIdUtilisateur());
                accesDistant.envoi("mesDemandes", MesDemandes.get(ligne).accepterConvertToJSONArray() );
            }

        });

         */
        return view;
    }


    static class ViewHolder{
        TextView txtAcceptePar;
        TextView txtDate;
        TextView txtTitreDemande;
    }
}